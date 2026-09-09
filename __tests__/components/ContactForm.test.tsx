import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/ContactForm";

async function fillMinimum(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByRole("textbox", { name: /come ti chiami/i }), "Mario Rossi");
  await user.type(screen.getByRole("textbox", { name: /telefono o email/i }), "mario@example.com");
  await user.click(screen.getByRole("checkbox", { name: /trattamento dei dati/i }));
}

describe("ContactForm", () => {
  it("renders the privacy consent checkbox unchecked by default", () => {
    render(<ContactForm />);
    expect(screen.getByRole("checkbox", { name: /trattamento dei dati/i })).not.toBeChecked();
  });

  it("does not render a fax field anywhere", () => {
    render(<ContactForm />);
    expect(screen.queryByText(/fax/i)).not.toBeInTheDocument();
  });

  it("guides the enquirer with options rather than a blank message box", () => {
    render(<ContactForm />);
    // The intervention type is a choice, so someone who doesn't know the
    // vocabulary can still answer — including an explicit "not sure yet".
    expect(screen.getByRole("group", { name: /di cosa si tratta/i })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /non lo so ancora/i })).toBeInTheDocument();
    // The free-text box is explicitly optional.
    expect(screen.getByRole("textbox", { name: /facoltativo/i })).toBeInTheDocument();
  });

  it("can be sent without writing any free text", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });

    render(<ContactForm />);
    await fillMinimum(user);
    await user.click(screen.getByRole("button", { name: /invia richiesta/i }));

    expect(await screen.findByRole("status")).toHaveTextContent(/abbiamo ricevuto la tua richiesta/i);
    const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    expect(body.message).toBeUndefined();
    expect(body.interventionType).toBe("Ristrutturazione di un immobile");
  });

  it("carries the originating project so the enquirer needn't explain it", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });

    render(<ContactForm reference="Via Venezia" />);
    expect(screen.getByText(/via venezia/i)).toBeInTheDocument();

    await fillMinimum(user);
    await user.click(screen.getByRole("button", { name: /invia richiesta/i }));

    await screen.findByRole("status");
    const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    expect(body.reference).toBe("Via Venezia");
  });

  it("shows a retryable error and re-enables the button when the network request fails", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn().mockRejectedValue(new Error("network error"));

    render(<ContactForm />);
    await fillMinimum(user);
    await user.click(screen.getByRole("button", { name: /invia richiesta/i }));

    expect(await screen.findByText(/impossibile inviare il messaggio/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /invia richiesta/i })).not.toBeDisabled();
  });
});

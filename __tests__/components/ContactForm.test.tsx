import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/ContactForm";

// Il modulo e' in tre passi: si arriva ai campi di contatto solo dopo
// aver superato le due domande iniziali.
async function goToLastStep(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: /avanti/i }));
  await user.click(screen.getByRole("button", { name: /avanti/i }));
}

async function fillMinimum(user: ReturnType<typeof userEvent.setup>) {
  await goToLastStep(user);
  await user.type(screen.getByRole("textbox", { name: /come ti chiami/i }), "Mario Rossi");
  await user.type(screen.getByRole("textbox", { name: /telefono o email/i }), "mario@example.com");
  await user.click(screen.getByRole("checkbox", { name: /trattamento dei dati/i }));
}

describe("ContactForm", () => {
  it("renders the privacy consent checkbox unchecked by default", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await goToLastStep(user);
    expect(screen.getByRole("checkbox", { name: /trattamento dei dati/i })).not.toBeChecked();
  });

  it("does not render a fax field anywhere", () => {
    render(<ContactForm />);
    expect(screen.queryByText(/fax/i)).not.toBeInTheDocument();
  });

  it("opens on one simple question rather than the whole form", () => {
    render(<ContactForm />);
    expect(screen.getByText(/passo 1 di 3/i)).toBeInTheDocument();
    // The intervention type is a choice, so someone who doesn't know the
    // vocabulary can still answer, including an explicit "not sure yet".
    expect(screen.getByRole("radio", { name: /non lo so ancora/i })).toBeInTheDocument();
    // The contact fields belong to the last step, so they are hidden and
    // genuinely absent from the accessibility tree — not merely invisible.
    expect(screen.queryByRole("textbox", { name: /come ti chiami/i })).not.toBeInTheDocument();
  });

  it("walks forward and back through the steps without losing answers", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("radio", { name: /nuova costruzione/i }));
    await user.click(screen.getByRole("button", { name: /avanti/i }));
    expect(screen.getByText(/passo 2 di 3/i)).toBeInTheDocument();

    await user.type(screen.getByRole("textbox", { name: /dove si trova/i }), "Pescara");
    await user.click(screen.getByRole("button", { name: /indietro/i }));
    expect(screen.getByRole("radio", { name: /nuova costruzione/i })).toBeChecked();

    await user.click(screen.getByRole("button", { name: /avanti/i }));
    expect(screen.getByRole("textbox", { name: /dove si trova/i })).toHaveValue("Pescara");
  });

  it("keeps the free-text box optional on the last step", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await goToLastStep(user);
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

  it("lets the enquirer detach the project when the question is about something else", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });

    render(<ContactForm reference="Via Venezia" />);
    expect(screen.getByText(/via venezia/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /volevo chiedere di altro/i }));
    expect(screen.queryByText(/via venezia/i)).not.toBeInTheDocument();

    await fillMinimum(user);
    await user.click(screen.getByRole("button", { name: /invia richiesta/i }));
    await screen.findByRole("status");

    const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
    expect(body.reference).toBeUndefined();
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

  it("non manda niente al server se il recapito non è un recapito", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn();

    render(<ContactForm />);
    await goToLastStep(user);
    await user.type(screen.getByRole("textbox", { name: /come ti chiami/i }), "Mario Rossi");
    await user.type(screen.getByRole("textbox", { name: /telefono o email/i }), "ciao");
    await user.click(screen.getByRole("checkbox", { name: /trattamento dei dati/i }));
    await user.click(screen.getByRole("button", { name: /invia richiesta/i }));

    expect(global.fetch).not.toHaveBeenCalled();
    expect(screen.getByText(/serve un numero di telefono o un'email/i)).toBeInTheDocument();
    // Il campo sbagliato riceve il fuoco, così chi usa la tastiera o uno
    // screen reader si ritrova dove deve correggere.
    expect(screen.getByRole("textbox", { name: /telefono o email/i })).toHaveFocus();
  });

  it("rifiuta un numero troppo corto per essere chiamabile", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn();

    render(<ContactForm />);
    await goToLastStep(user);
    await user.type(screen.getByRole("textbox", { name: /come ti chiami/i }), "Mario Rossi");
    await user.type(screen.getByRole("textbox", { name: /telefono o email/i }), "34828688");
    await user.click(screen.getByRole("checkbox", { name: /trattamento dei dati/i }));
    await user.click(screen.getByRole("button", { name: /invia richiesta/i }));

    expect(global.fetch).not.toHaveBeenCalled();
    expect(screen.getByText(/serve un numero di telefono o un'email/i)).toBeInTheDocument();
  });

  it("accetta un numero scritto come lo scrive la gente", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });

    render(<ContactForm />);
    await goToLastStep(user);
    await user.type(screen.getByRole("textbox", { name: /come ti chiami/i }), "Mario Rossi");
    await user.type(screen.getByRole("textbox", { name: /telefono o email/i }), "328 400 6099");
    await user.click(screen.getByRole("checkbox", { name: /trattamento dei dati/i }));
    await user.click(screen.getByRole("button", { name: /invia richiesta/i }));

    expect(await screen.findByRole("status")).toBeInTheDocument();
  });

  it("toglie l'errore appena si ricomincia a scrivere", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });

    render(<ContactForm />);
    await goToLastStep(user);
    await user.type(screen.getByRole("textbox", { name: /come ti chiami/i }), "Mario Rossi");
    const recapito = screen.getByRole("textbox", { name: /telefono o email/i });
    await user.type(recapito, "ciao");
    await user.click(screen.getByRole("checkbox", { name: /trattamento dei dati/i }));
    await user.click(screen.getByRole("button", { name: /invia richiesta/i }));
    expect(screen.getByText(/serve un numero di telefono/i)).toBeInTheDocument();

    await user.clear(recapito);
    await user.type(recapito, "0864 845252");
    expect(screen.queryByText(/serve un numero di telefono/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /invia richiesta/i }));
    expect(await screen.findByRole("status")).toBeInTheDocument();
  });

  it("rifiuta un nome fatto di sole cifre", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn();

    render(<ContactForm />);
    await goToLastStep(user);
    await user.type(screen.getByRole("textbox", { name: /come ti chiami/i }), "123");
    await user.type(screen.getByRole("textbox", { name: /telefono o email/i }), "328 4006099");
    await user.click(screen.getByRole("checkbox", { name: /trattamento dei dati/i }));
    await user.click(screen.getByRole("button", { name: /invia richiesta/i }));

    expect(global.fetch).not.toHaveBeenCalled();
    expect(screen.getByText(/inserisci il tuo nome/i)).toBeInTheDocument();
  });
});

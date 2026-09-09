import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/ContactForm";

describe("ContactForm", () => {
  it("renders the privacy consent checkbox unchecked by default", () => {
    render(<ContactForm />);
    expect(screen.getByRole("checkbox", { name: /trattamento dei dati/i })).not.toBeChecked();
  });

  it("does not render a fax field anywhere", () => {
    render(<ContactForm />);
    expect(screen.queryByText(/fax/i)).not.toBeInTheDocument();
  });

  it("shows a retryable error and re-enables the button when the network request fails", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn().mockRejectedValue(new Error("network error"));

    render(<ContactForm />);

    await user.type(screen.getByRole("textbox", { name: /^nome$/i }), "Mario Rossi");
    await user.type(screen.getByRole("textbox", { name: /telefono o email/i }), "mario@example.com");
    await user.type(screen.getByRole("textbox", { name: /tipo di intervento/i }), "Ristrutturazione");
    await user.type(
      screen.getByRole("textbox", { name: /messaggio/i }),
      "Vorrei un preventivo per la mia casa."
    );
    await user.click(screen.getByRole("checkbox", { name: /trattamento dei dati/i }));
    await user.click(screen.getByRole("button", { name: /invia richiesta/i }));

    expect(await screen.findByText(/impossibile inviare il messaggio/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /invia richiesta/i })).not.toBeDisabled();
  });
});

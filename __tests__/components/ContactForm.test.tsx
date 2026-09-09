import { render, screen } from "@testing-library/react";
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
});

import { act, fireEvent, render, screen, within } from "@testing-library/react";
import Home from "./index";
import { api, DataProvider } from "../../contexts/DataContext";
import EventList from "../../containers/Events";

const mockData = {
  "events": [
    {
      "id": 1,
      "type": "conférence",
      "date": "2022-04-29T20:28:45.744Z",
      "title": "User&product MixUsers",
      "cover": "/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png",
      "description": "Présentation des nouveaux usages UX.",
      "nb_guesses": 900,
      "periode": "14-15-16 Avril",
      "prestations": [
        "1 espace d’exposition",
        "1 scéne principale",
        "1 espace de restaurations"
      ]
    },
    {
      "id": 13,
      "type": "conférence",
      "date": "2022-08-29T20:28:45.744Z",
      "title": "Conférence #productCON",
      "cover": "/images/headway-F2KRf_QfCqw-unsplash.png",
      "description": "Présentation des outils analytics aux professionnels du secteur ",
      "nb_guesses": 1300,
      "periode": "24-25-26 Février",
      "prestations": [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié"
      ]
    },
  ],
  "focus": [
    {
      "title": "World economic forum",
      "description": "Oeuvre à la coopération entre le secteur public et le privé.",
      "date": "2022-01-29T20:28:45.744Z",
      "cover": "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png"
    },
    {
      "title": "Nordic design week",
      "description": "Conférences sur le design de demain dans le digital",
      "date": "2022-03-29T20:28:45.744Z",
      "cover": "/images/teemu-paananen-bzdhc5b3Bxs-unsplash1.png"
    },
    {
      "title": "Sneakercraze market",
      "description": "Rencontres de spécialistes des Sneakers Européens.",
      "date": "2022-05-29T20:28:45.744Z",
      "cover": "/images/jakob-dalbjorn-cuKJre3nyYc-unsplash 1.png"
    }
  ]
}

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(mockData);

    await act(async () => {
      render(
        <DataProvider>
          <EventList />
        </DataProvider>
      );
    })

    await screen.getByText("User&product MixUsers")
    await screen.getByText("Conférence #productCON")
  })

  it("a list a people is displayed", async () => {
    // to do ?
    render(
      <Home />
    )
    await screen.findByText("Christine")
    await screen.findByText("VP animation")
    await screen.findByText("Alice")
    await screen.findByText("CXO")
  })

  it("a footer is displayed", async () => {
    render(<Home />)
    await screen.getByRole("contentinfo")
  })

  it("an event card, with the last event, is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(mockData);

    await act(async () => {
      render(
        <DataProvider>
          <Home />
        </DataProvider>
      );
    })

    const footer = await screen.getByRole("contentinfo")
    await within(footer).findByText("Conférence #productCON", {selector: ".EventCard__title"})
  })
});

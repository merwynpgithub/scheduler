import React from "react";

import { render, cleanup, fireEvent, waitForElement, prettyDOM, getByText, getAllByTestId } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  /*
  it("renders without crashing", () => {
    render(<Application />);
  });
  
  //old way: return asynchronous promise type
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    
    return waitForElement(() => getByText("Monday"))
      .then(() => {
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument();
      });
  });
  */

  //new way: async await
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Monday"));
    // console.log(prettyDOM(container));
    const appointments = getAllByTestId(container, "appointment");
    console.log(prettyDOM(appointments[0]));
  });

});


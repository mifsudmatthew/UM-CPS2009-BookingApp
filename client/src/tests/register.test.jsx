import "@testing-library/jest-dom";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Register from "../pages/Register";

test("loads and displays greeting", async () => {
  render(<Register />);
  await screen.findByRole("heading");
  expect(screen.getByRole("heading")).toBeInTheDocument();
});

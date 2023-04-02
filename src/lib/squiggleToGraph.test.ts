import { squiggleToGraph } from "./squiggleToGraph";
import { test, describe, expect } from "vitest";
import { run, SqProject } from "@quri/squiggle-lang";

describe("squiggleToGraph", () => {
  test("creates node for each expression", () => {
    expect(squiggleToGraph(getProject("i = 1\nj = 2"))).toEqual({
      nodes: [
        {
          data: {
            id: "i",
          },
        },
        {
          data: {
            id: "j",
          },
        },
      ],
      edges: [],
    });
  });

  test("creates edges when one variable references another", () => {
    expect(squiggleToGraph(getProject("i = 1\nj = i"))).toEqual({
      nodes: [
        {
          data: {
            id: "i",
          },
        },
        {
          data: {
            id: "j",
          },
        },
      ],
      edges: [
        {
          data: {
            id: "j-i",
            source: "j",
            target: "i",
          },
        },
      ],
    });
  });

  test("creates edges when one variable references another in a nested expression", () => {
    expect(squiggleToGraph(getProject("i = 1\nj = i + 1"))).toEqual({
      nodes: [
        {
          data: {
            id: "i",
          },
        },
        {
          data: {
            id: "j",
          },
        },
      ],
      edges: [
        {
          data: {
            id: "j-i",
            source: "j",
            target: "i",
          },
        },
      ],
    });
  });

  test("creates edges when one variable references another in a block expression", () => {
    expect(squiggleToGraph(getProject("i = 1\nj = { i + 1 }"))).toEqual({
      nodes: [
        {
          data: {
            id: "i",
          },
        },
        {
          data: {
            id: "j",
          },
        },
      ],
      edges: [
        {
          data: {
            id: "j-i",
            source: "j",
            target: "i",
          },
        },
      ],
    });
  });

  test("creates nodes for variables created inside block", () => {
    expect(squiggleToGraph(getProject("i = 1\nj = { k = 2\nk + 4 }"))).toEqual({
      nodes: [
        {
          data: {
            id: "i",
          },
        },
        {
          data: {
            id: "j",
          },
        },
        {
          data: {
            id: "k",
          },
        },
      ],
      edges: [
        {
          data: {
            id: "j-k",
            source: "j",
            target: "k",
          },
        },
      ],
    });
  });
});

function getProject(code: string): SqProject {
  const result = run(code).result;
  if (!result.ok) {
    throw new Error(result.value.toString());
  }
  return result.value.location.project;
}
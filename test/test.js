const test = require("tape");
const convert = require("../dist/index.cjs.js");
const hexToRGBA = convert.hexToRGBA;

const hex = [
  {
    hex: "2b1",
    hash: "#2b1",
    expected: "rgba(34, 187, 17, 1)",
  },
  {
    hex: "33a",
    hash: "#33a",
    expected: "rgba(51, 51, 170, 1)",
  },
  {
    hex: "888",
    hash: "#888",
    expected: "rgba(136, 136, 136, 1)",
  },
  {
    hex: "2c1b",
    hash: "#2c1b",
    expected: "rgba(34, 204, 17, 0.73)",
  },
  {
    hex: "62b7",
    hash: "#62b7",
    expected: "rgba(102, 34, 187, 0.47)",
  },
  {
    hex: "92368b",
    hash: "#92368b",
    expected: "rgba(146, 54, 139, 1)",
  },
  {
    hex: "3bd873",
    hash: "#3bd873",
    expected: "rgba(59, 216, 115, 1)",
  },
  {
    hex: "0000ff",
    hash: "#0000ff",
    expected: "rgba(0, 0, 255, 1)",
  },
  {
    hex: "0000ff80",
    hash: "#0000ff80",
    expected: "rgba(0, 0, 255, 0.50)",
  },
  {
    hex: "67c16aab",
    hash: "#67c16aab",
    expected: "rgba(103, 193, 106, 0.67)",
  },
  {
    hex: "775e16e8",
    hash: "#775e16e8",
    expected: "rgba(119, 94, 22, 0.91)",
  },
];

const notHex = [
  {
    hex: "2",
  },
  {
    hex: "#33333",
  },
  {
    hex: "888888888",
  },
  {
    hex: "#fffpff",
  },
  {
    hex: "g9x",
  }
]

hex.forEach((h) => {
  const testCase = (a, val) => {
    a.plan(1);
    a.equal(hexToRGBA(val), h.expected);
  };
  test("Convert Hex: " + h.hex, (a) => testCase(a, h.hex));
  test("Convert Hash: " + h.hash, (a) => testCase(a, h.hash));
});

notHex.forEach((h) => {
  const testCase = (a, val) => {
    a.plan(1);
    a.throws(hexToRGBA(val))
  };
  test("Incorrect Type Hex: " + h.hex, (a) => testCase(a, h.hex));
});
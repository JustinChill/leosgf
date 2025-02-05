// const btn = document.getElementById('menu-btn')
// const nav = document.getElementById('menu')

// btn.addEventListener('click', () => {
//   btn.classList.toggle('open')
//   nav.classList.toggle('flex')
//   nav.classList.toggle('hidden')
// })

var size = width > 450 ? 14 : 12;
var element = d3.select('figure').node();
var width = element.getBoundingClientRect().width;

const dataTable = new simpleDatatables.DataTable("#relationships", {
    searchable: false,
    fixedHeight: false,
    paging: false,
    autoWidth: true,
    responsive: true,
    scrollX: true,
    order: [[2, 'desc']]
});

var leobirthday = new Date(1974, 11, 11);

// Define data
const df = [
  { year: 1999, age_leo: 24, age_gf: 18, gf: "Gisele Bündchen" },
  { year: 2000, age_leo: 25, age_gf: 19, gf: "Gisele Bündchen" },
  { year: 2001, age_leo: 26, age_gf: 20, gf: "Gisele Bündchen" },
  { year: 2002, age_leo: 27, age_gf: 21, gf: "Gisele Bündchen" },
  { year: 2003, age_leo: 28, age_gf: 22, gf: "Gisele Bündchen" },
  { year: 2004, age_leo: 29, age_gf: 23, gf: "Gisele Bündchen" },
  { year: 2005, age_leo: 30, age_gf: 20, gf: "Bar Refaeli" },
  { year: 2006, age_leo: 31, age_gf: 21, gf: "Bar Refaeli" },
  { year: 2007, age_leo: 32, age_gf: 22, gf: "Bar Refaeli" },
  { year: 2008, age_leo: 33, age_gf: 23, gf: "Bar Refaeli" },
  { year: 2009, age_leo: 34, age_gf: 24, gf: "Bar Refaeli" },
  { year: 2010, age_leo: 35, age_gf: 25, gf: "Blake Lively" },
  { year: 2011, age_leo: 36, age_gf: 23, gf: "Erin Heatherton" },
  { year: 2012, age_leo: 37, age_gf: 22, gf: "Erin Heatherton" },
  { year: 2013, age_leo: 38, age_gf: 20, gf: "Toni Garrn" },
  { year: 2014, age_leo: 39, age_gf: 21, gf: "Toni Garrn" },
  { year: 2015, age_leo: 40, age_gf: 25, gf: "Kelly Rohrbach" },
  { year: 2016, age_leo: 41, age_gf: 24, gf: "Nina Agdal" },
  { year: 2017, age_leo: 42, age_gf: 25, gf: "Nina Agdal" },
  { year: 2018, age_leo: 43, age_gf: 20, gf: "Camila Morrone" },
  { year: 2019, age_leo: 44, age_gf: 21, gf: "Camila Morrone" },
  { year: 2020, age_leo: 45, age_gf: 22, gf: "Camila Morrone" },
  { year: 2021, age_leo: 46, age_gf: 23, gf: "Camila Morrone" },
  { year: 2022, age_leo: 47, age_gf: 24, gf: "Victoria Lamas" },
  { year: 2023, age_leo: 48, age_gf: 24, gf: "Vittoria Ceretti" },
  { year: 2024, age_leo: 49, age_gf: 25, gf: "Vittoria Ceretti" },
  { year: 2025, age_leo: 50, age_gf: 26, gf: "Vittoria Ceretti" },
];

const max_points = [
  { x: 2010, y: 25 },
  { x: 2015, y: 25 },
  { x: 2017, y: 25 }
];

var mobile = window.innerWidth <= 500;  // True if the width is 500px or less, otherwise false

var chart = {
  width: width,
  height: 400,
  marginTop: 40,
  marginBottom: 40,
  style: {
    fontSize: size,
    paddingBottom: 0,
  },
  y: {
    tickSize: 4,
    nice: true,
    labelOffset: 0,
    tickFormat: "Y",
    domain: [15, 50],
  },
  x: {
    tickSize: 0,
    tickFormat: "Y",
  },
  color: {
    legend: true,
  },
  marks: [
    // Leo's age line
    Plot.line(df, {x: "year", y: "age_leo", stroke: "#FD7600", fill: "#FD7600", marker: "circle-stroke", fill: "none"}),
    Plot.text(df, {
      x: "year",
      y: (d) => d.age_leo + 1,
      dy: -4,
      text: (d) => d.age_leo.toString(),
      fill: "#FD7600",
      textAnchor: "middle",
      fontSize: size + 4,
    }),
    // Girlfriend's age segments
    Plot.barY(df, {x: "year", y: "age_gf", y1: 15, y2: "age_gf",fill: "url(#gradient)", title: "gf"}),
    Plot.text(df, {
      x: "year",
      y: (d) => d.age_gf + 1,
      dy: -2,
      text: (d) => d.age_gf.toString(),
      className: "text-base",
      textAnchor: "middle",
    }),
    // Max age annotations
    // Plot.text(max_points, {x: "x", y: "y", text: "Leo's Age Limit", color: "#B6B6B6"}),
    Plot.image(df, {
      filter: d => d.year != "2022",
      x: "year",
      y: 5,
      r: 12,
      width: 40,
      dy: -12,
      preserveAspectRatio: "xMidYMin slice",
      src: (d) => `images/${d.gf.toLowerCase().replace(' ', '_')}.png`,
      title: "gf"
    }),
    Plot.image(df, Plot.selectLast({
      x: "year",
      y: "age_leo",
      src: (d) => `images/leonardo_dicaprio.png`,
      width: 40,
      dy: 40,
      title: "Leonardo DiCaprio",
    })),
    mobile ? null : Plot.text([
      {x: 2025, y: 35, text: "As per 'Leo's Law', 4 relationships ended\nwhen they reached Leo's cutoff age of 25."}
    ], {
      x: "x",
      y: "y",
      text: (d) => d.text,
      className: "text-base",
      fontWeight: 300,
      frameAnchor: "right",
      textAnchor: "end",
      dy: -5,
    }),
  ]
};

document.getElementById("chart").appendChild(Plot.plot(chart));
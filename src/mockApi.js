export const fetchMockData = async () => ({
  inflows: [
    { id: 1, name: "Salary", value: 5000, details: "Monthly Salary" },
  ],
  outflows: [
    {
      id: 2,
      name: "Bills",
      value: 3000,
      children: [
        { id: 3, name: "Electric Bill", value: 1000 },
        { id: 4, name: "Mobile Bill", value: 2000 },
      ],
    },
  ],
});
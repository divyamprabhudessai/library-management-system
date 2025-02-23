import { useEffect, useState } from "react";
import { Card, Title, Subtitle } from "@tremor/react";
import { format } from "date-fns";

function Dashboard() {
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalIssuedBooks, setTotalIssuedBooks] = useState(0);
  const [totalPendingReturns, setTotalPendingReturns] = useState(0);
  const [pendingReturns, setPendingReturns] = useState([]);

  useEffect(() => {
    // Fetch total members
    fetch("http://localhost:3000/total-members")
      .then((res) => res.json())
      .then((data) => setTotalMembers(data.totalMembers))
      .catch((error) => console.error("Error fetching total members:", error));

    // Fetch total issued books
    fetch("http://localhost:3000/total-issued-books")
      .then((res) => res.json())
      .then((data) => setTotalIssuedBooks(data.totalIssuedBooks))
      .catch((error) =>
        console.error("Error fetching total issued books:", error)
      );

    // Fetch total pending returns
    fetch("http://localhost:3000/total-pending-returns")
      .then((res) => res.json())
      .then((data) => setTotalPendingReturns(data.totalPendingReturns))
      .catch((error) =>
        console.error("Error fetching total pending returns:", error)
      );

    // Fetch pending returns list
    fetch("http://localhost:3000/pending-returns")
      .then((res) => res.json())
      .then((data) => setPendingReturns(data))
      .catch((error) =>
        console.error("Error fetching pending returns:", error)
      );
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card decoration="top" decorationColor="indigo">
          <Title>Total Members</Title>
          <Subtitle>Active library members</Subtitle>
          <p className="mt-4 text-2xl font-semibold">{totalMembers}</p>
        </Card>

        <Card decoration="top" decorationColor="green">
          <Title>Books read</Title>
          <Subtitle>Total books borrowed</Subtitle>
          <p className="mt-4 text-2xl font-semibold">{totalIssuedBooks}</p>
        </Card>

        <Card decoration="top" decorationColor="red">
          <Title>Overdue Returns</Title>
          <Subtitle>Books past due date</Subtitle>
          <p className="mt-4 text-2xl font-semibold">{totalPendingReturns}</p>
        </Card>
      </div>

      <Card>
        <Title>Pending Returns</Title>
        <div className="mt-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingReturns.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.member}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.book}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(item.dueDate), "MMM dd, yyyy")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;

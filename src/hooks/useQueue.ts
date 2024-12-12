import { useState, useEffect } from 'react';

interface QueueUser {
  qid: string;
  name: string;
  service: string;
  price: string;
  scanTime: string;
  status: string;
  statusClass: string;
}

export const useQueue = () => {
  const [queueData, setQueueData] = useState<QueueUser[]>([
    {
      qid: "KING-DL-20240224-001",
      name: "John Doe",
      service: "Vehicle Licensing",
      price: "$150.00",
      scanTime: "09:15",
      status: "Present",
      statusClass: "text-green-500",
    },
    {
      qid: "KING-AP-20240224-002",
      name: "Jane Smith",
      service: "Apartment Viewing",
      price: "$75.00",
      scanTime: "10:05",
      status: "Processing",
      statusClass: "text-yellow-500",
    },
    {
      qid: "KING-GL-20240224-003",
      name: "Bob Johnson",
      service: "General Licensing",
      price: "$200.00",
      scanTime: "10:20",
      status: "Waiting",
      statusClass: "text-gray-400",
    },
  ]);

  return { queueData };
};
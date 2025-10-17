export interface ClientData {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const clientItems: ClientData[] = [
  {
    id: "client-1",
    src: "/client-1.png",
    alt: "Client logo 1",
    width: 135,
    height: 27
  },
  {
    id: "client-2",
    src: "/client-2.png",
    alt: "Client logo 2",
    width: 112,
    height: 22
  },
  {
    id: "client-3",
    src: "/client-3.png",
    alt: "Client logo 3",
    width: 93,
    height: 40
  },
  {
    id: "client-4",
    src: "/client-4.png",
    alt: "Client logo 4",
    width: 135,
    height: 19
  },
  {
    id: "client-5",
    src: "/client-5.png",
    alt: "Client logo 5",
    width: 106,
    height: 39
  }
];
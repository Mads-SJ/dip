import express from "express";
import cors from "cors";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  getDoc,
  query,
  where,
  getCountFromServer,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAar3qnspIBo__hFBTFGKmTewVTqIh26HQ",
  authDomain: "skole-dip.firebaseapp.com",
  projectId: "skole-dip",
  storageBucket: "skole-dip.appspot.com",
  messagingSenderId: "873102678517",
  appId: "1:873102678517:web:074fa2f8a65b3b7df168bc",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const app = express();
const port = 8080;
let id = 1;
const messages = [{ chatRum: "Startrum", id: 0, tekst: "Hej med dig!" }];
const rooms = [
  { navn: "Startrum" },
  { navn: "Rum 1" },
  { navn: "Rum 2" },
  { navn: "Rum 3" },
];

app.use(cors());
app.use(express.json());

app.get("/Beskeder", async (request, response) => {
  const messagesDocs = await getDocs(collection(db, "beskeder"));
  let messages = messagesDocs.docs.map(doc => {
    const data = doc.data();
    data.id = doc.id;
    return data;
  });
  response.status(200).send(messages);
});

app.get("/chatRum", async (request, response) => {
  const chatRumDocs = await getDocs(collection(db, "chatrum"));

  let chatRum = chatRumDocs.docs.map(doc => doc.data());
  response.status(200).send(chatRum);
});

app.get("/SoegBeskeder/:rum", async (request, response) => {
  const rum = request.params.rum;
  const messagesDocs = await getDocs(
    query(collection(db, "beskeder"), where("chatRum", "==", rum))
  );

  // counting messages in room
  const count = await getCountFromServer(
    query(collection(db, "beskeder"), where("chatRum", "==", rum))
  );

  console.log(count.data().count);

  let messages = messagesDocs.docs.map(doc => {
    const data = doc.data();
    data.id = doc.id;
    return data;
  });
  response.status(200).send(messages);
});

app.post("/Beskeder", async (request, response) => {
  const message = request.body;
  await addDoc(collection(db, "beskeder"), message);
  response.status(201).send("Message created");
});

app.delete("/Beskeder/:id", async (request, response) => {
  const id = request.params.id;

  await deleteDoc(doc(db, "beskeder", id));

  response.status(200).send("Message deleted");
});

app.listen(port);
console.log(`Listening on port ${port} ...`);

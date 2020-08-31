# **Networking**

## **TCP/IP**

**TCP/IP**, which stands for **Transmission Control Protocol/Internet Protocol** is a group of guidelines according to which netowrk devices are connected via the internet. This protocol determines the means by which data is transferred over the internet.

### **What do TCP and IP do?**

Even though the **TCP** and **IP** protocols are almost always listed together, they have distinct differences.

* **TCP** is used to dictate how devices communicate across a network. This involves structuring messages into smaller packets before they reach their final destination.
* **IP** determines the route that the packet takes to reach its destination: it sets the route for the packet transfer.

In other words, TCP has the responsibility for separating the packets and IP has to ensure that they reach their destination.

There are four layers that comprise TCP/IP:

1. the **Network Access Layer**
2. the **Internet Layer**
3. the **Transport Layer**
4. the **Application Layer**

### **Protocol Operation**

**TCP protocol operation** is divided into thre phases: connections must be properly established in a multi-step handshake process during the ***connection establishment*** phase, before entering the actual ***data transfer*** phase.

After data transfer is completed, the ***connection termination*** closes established virtual circuits and releases all allocated resources.


#### *Connection establishment: TCP and the Three-Way Handshake*

**TCP** sets up connections via a three-way handshake, which is also called **SYN-SYN-ACK**. It is named so because three messages are required to start the connection between two network devices. 

Before a client attemptos to connect with a server, the server must first bind to and listen at a port to open it up for connections: this is called a **passive open**. 

Once the the passive open is established, a client may initiate an **active open**.

To estiablish a connection, the three-way handshake occurs:

1. **SYN:** The first host, or client, performs an active open by sending a **SYN** packet to the server. The client sets the segement's sequence number to a random value X.
2. **SYN-ACK:** In response, the server replies with **SYN-ACK**, with the acknowledgement number and an additional sequence number. The acknowledgement number is set to one more than the recieved number, i.e. X+1, while the server's sequence number is set to a random number Y.
3. **ACK:** Finally, the clients sends an **ACK** back to the server. The sequence number is set to the received acknowledgement number (X+1) from the server and the acknowledgement number is set to recieved sequence number from the server, plus 1, i.e.: Y+1.

At this point, both the client and server have received an acknowledgement of the connection. The steps 1 and 2 establish the connection parameter (or sequence number) in onde direction and it is acknowledged. The steps 2 and 3 establish the connection parameter for the other direction and it is acknowledged. With these, a full-duplex communication is established.


![](2020-08-31-20-20-10.png)

### *Connection termination*

The connection termination phase uses a four-way handshake, with each side of the connection terminating independently.

When an endpoint wishes to stop its half of the connection, it transmits a **FIN** packet, which the other end acks with an **ACK** packet.

Therefore a typical connection termination requires a pair of **FIN** and **ACK** segments from each TCP endpoint, i.e. four packets delivered:

![](2020-08-31-20-20-30.png)

After the side that sent the first **FIN** has responded with the final **ACK**, it waits for a timeout before finally closing the connection, during which time the local port is unavailable for new connections: this prevents confusion due to delayed packets being delivered in subsequent connections.


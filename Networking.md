# TCP/IP

**TCP/IP**, which stands for **Transmission Control Protocol/Internet Protocol** is a group of guidelines according to which netowrk devices are connected via the internet. This protocol determines the means by which data is transferred over the internet.

## What do TCP and IP do?

**TCP** provides **reliable, ordered and error-checked** delivery of a stream of bytes between applications running on hosts communicating via an IP network.

TCP handles all handshaking and transmission details and presents an abstraction of the network connection to the applications running on the hosts.

Because of factors such as network congestion, traffic load balancing or unpredicatable network behaviour, packets may be lost, duplicated or delivered out of order. TCP detects these problems, requests re-transmission of lost data, re-arranges out-of-order data or deletes duplicate data. Once the TCP receiver has reassembled the sequence of bytes originally transmitted, it passes them to the receiving application. (So this networking details are abstracted by the TCP from the application communication).

TCP is a reliable stream delivery service which guarantees that all bytes recieved will be identical and in the same order as those sent. Since packet transfer by many networks is not reliable, TCp achieves this using a technique known as *positive acknowledgement with re-transmission*. This requires the receiver to respond with an acknowledgement message as it receives the data. The sender keeps a **record** of each packet it sends and mantains a **timer** from the moment when the package was sent. The sender re-transmits a packet if the timer expires before receiving the acknowledgement, which could mean that the packet got lost or corrupted.

Major internet applications such as the World Wide Web (WWW), email (SMTP), P2P file sharing, Secure Shell (SSH) and file transfer (FTP) rely on TCP, which is part of the Transport Layer of the TCP/IP suite.

**IP (Internet Protocol)** has the task of delivering packets from the source host to the destination host solely based on the IP addresses in the packet headers. For this purpose, IP defines packet structures that encapsulate the data to be delivered, which contain a header and a payload. IP determines the route that the packet takes to reach its destination: it sets the route for the packet transfer.

## How do TCP and IP layers work together?

While **IP** handles actual delivery of the data, **TCP** keeps tracks of segments - the individual units of data that a message is divided into for efficient routing thought the network. 

For example, when an HTML file is sent from a web server, the TCP layer divides the file into segments and forwards them individually to the **internet layer** on the **network stack**, where the **IP** protocol encapsulates each of them into an IP packet by adding a header which contains (among other data) the destination IP address, while the payload is the actual data to be transmitted.

When the client program on the destination host receives them, the TCP software in the transport layer re-assembles the segments and ensures they are correctly order and error-free. Then it streams the file contents to the receiving application. 

## Network Stack Layers

The Request For Comments (RFC) 1122 loosely defined a four-layer model, with the layer having names:


There are four layers that comprise **Network Stack**:

1. The **Application Layer** is the scope in which applications, or processes, create user data and communicate this data to other applications on another or the same host. The applications make use of the services provided by the underlying lower layer, especially the (next) transport layer, which provides with either reliable or unreliable pipes to other processes. This is the layer in which all application protocols, such as **HTTP, SMTP, FTP and SSH** operate. Processes are addressed via ports which essentially represent services.
2. The **Transport Layer** performs host-to-host communications on either the local network or remote networks separated by routers. It provides a channel for the communication needs of applications. Here, connectivity can be categorized as either **connection-oriented, implemented in TCP**, or as **connectionless, implemented in UDP**. This layer is for example where TCP addresses reliability issues during the transfer like packets arriving in the wrong order, or corrputed, or being list.
3. The **Internet Layer** provides internetworking between independent networks, by hiding the actual topology of the underlying network connections. It is therefore the layer that defines and establishes the Internet. This layer defines the addressing and routing structures used in the **IP protocol**, which defines IP addresses. Its function is to transport packets to the next host, functioning as an IP router, that has the connectivity to a network closer to the final destination of the data.
4. The **Link Layer** contains the communication methods for data that remains within a single network segment. It includes the protocols used to describe the local network topology.

![](2020-08-31-21-46-30.png)
Example of encapsulation of application data carried by UDP to a link protocol frame.

## TCP Protocol Operation

**TCP protocol operation** is divided into thre phases: connections must be properly established in a multi-step handshake process during the ***connection establishment*** phase, before entering the actual ***data transfer*** phase.

After data transfer is completed, the ***connection termination*** closes established virtual circuits and releases all allocated resources.


### *Connection establishment: TCP and the Three-Way Handshake*

**TCP** sets up connections via a three-way handshake, which is also called **SYN-SYN-ACK**. It is named so because three messages are required to start the connection between two network devices. 

Before a client attempts to connect with a server, the server must first bind to and listen at a port to open it up for connections: this is called a **passive open**. 

Once the the passive open is established, a client may initiate an **active open**.

To establish a connection, the three-way handshake occurs:

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



## IP Protocol: IPv4 vs IPv6

An IP address is a string of numbers that is assigned to a device to identify it on the internet. It is an address, just as the number and street of a home address, where packets can be sent to. That is exactly what the IP does: send packets to IP addresses.


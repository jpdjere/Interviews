# TCP/IP

**TCP/IP**, which stands for **Transmission Control Protocol/Internet Protocol** is a group of guidelines according to which network devices are connected via the internet. This protocol determines the means by which data is transferred over the internet.

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

There are two versions of Internet Protocol addresses: IPv4 and the newer IPv6.

### IPv4

Internet Protocol version 4 was developed in the early 1980s.

An **IPv4** comprises four number, each ranging from 0 to 256, separated by periods, a 32-bit address. Because of this, IPv4 has a theoretical limit of 4.3 billion addresses, which was more than enough. But with today's era of smartphones and IoT devices, we have went close to running out of addresses.

While initially workarounds have been implemented to postpone the issue, a successor was quickly needed and IPv6 was developed. At present, IPv4 and IPv6 coexist on the internet, but eventually as IPv4 equipment gets phased out, everything will be IPv6. It is just being rolled out slowly as replacing old IPv4 equipment would be prohibitively expensive and disruptive.

### IPv6

Internet Protocol version 6, or **IPv6** was introduced in the late 1990s as a replacement for IPv4.

**IPv6** uses 128-bit addresses, allowing for a theoretical 340 undecillion addresses. They are represented by eight groups of four hexadecimal digits, with the group separated by colons, although they are often abreviated.

In addition of solving the supply IP addresses, IPv6 also addressed many of version 4 shortcomings.

### IPv4 vs IPv6

IPv6 brought more functionality, in addition to more IP addresses.

* **More Efficient Routing:** IPv6 reduces the size of routing tables and makes routing more efficient and hierarchical. It allows ISPs to aggregate the prefixes of their customer's networks into a single prefix and announce this one prefix to the IPv6 internet.
* **More Efficient Packet Processing**: IPv6's simpliefied packet header makes packet processing more efficient. Compated to IPv4, IPv6 contains no IP-level checksum, so the checksum does not need to be recalculated at every router hop. Getting rid of the IP-level checksum was possible because most Link Layer technologies already contain checksum and error-control capabilities. In addition, most Transport Layers, which handle end-to-end connectivity, have a checksum that enables error detection.
* **Directed Data Flows:** IPv6 supports **multicast addressing**, rather than broadcast. This allows bandwith-intensive packet flows (such as multimedia streams) to be sent to multiple destinations simultaneously, saving network bandwidth. Desinterested hosts no longer must process broadcast packets.
* **Simplified Network Configuration**: IPv6 has a new feature called **autoconfiguration**, which allows a device to generate an IPv6 address as soon as it powers up and puts itself on the network. Adress auto-configuration (addess asignment) is built into IPv6. A router will send the prefix of the local link in its router advertisements. A host can generate its own IP address by appending its Link-Layer (MAC) address converted into Extended Universal Identifier (EUI) 64-bit format, to the 64 bits of the local link prefix.
* **Support For New Services:** By eliminating Network Address Translation (NAT), true end-to-end connectivity at the IP layer is restored, enabling new and valuable service. Peer-to-peer networks are easier to create and maintain, and services such as VoIP and Quality of Service (QoS) become more robust.
* **Security:** IPSec, which provides confidentiality, authentication and data integrity, is baked into IPv6.

# User Datagram Protocol (UDP)

**UDP** is a simple message-oriented Transport Layer protocol, documented in RFC 768. It uses a simple connectionless communication model with a minimum of protocol mechanisms: it has no handshaking dialogues and thus exposes the user's program to any unreliability of the underlying network; there is no guarantee of delivery, ordering or duplicate protection.

While it provides **integrity verification via checksum** of the header and payload, it provides no guarantees of message delivery to the Application Layer. 

Also, UDP retains no state of UDP messages once sent (in comparison with TCP). For this reasons, sometimes UDP is referred as Unreliable Datagram Protocol: if transmission reliability is desired when using UDP, it must be implemented on the Application layer, on the actual application.

Being connectionless, **UDP can broadcast** - sent packets can be addressed to be receivable by all devices on the subnet.

UDP is suitable for purposes where error checking and correction are either not necessary or performed in the application. Time-sensitive application often use UDP because dropping packets is perferable to waiting for packets delayed due to retransmission (such as in TCP), which may not be an option in a real-time system.

Streaming media, real-time multiplayer games and voice over IP (VoIP) are examples of applications that often use UDP. In these particular apps, loss of packets is not usually a fatal problems: in VoIP, for example, latency and jitter are the primary concerns. Using TCP for VoIP woould cause delays if any packets were lost as TCP does not provide subsequent data to the application white it is requesting the re-send of the lost data.

### Why does DNS use UDP and not TCP?

DNS is an Application Layer protocol.  TCP is reliable and UDP is not reliable. DNS is supposed to be reliable, but it still uses UDP: why?
 
There are interesting reasons concerning TCP and UDP on the Transport Layer that justify this choice:

1. UDP is much faster. TCP is slow as it requires 3-way handshake. The load on DNS servers is also an important factor. DNS servers (since they use UDP) don’t have to keep connections.
2. DNS requests are generally very small and fit well within UDP segments.
3. UDP is not reliable, but reliability can added on Application Layer. An application can use UDP and can be reliable by using a timeout and resend at the Application Layer.

Actually, DNS primarily uses the User Datagram Protocol (UDP) on port number 53 to serve requests. DNS queries consist of a single UDP request from the client followed by a single UDP reply from the server. When the length of the answer exceeds 512 bytes and both client and server support EDNS, larger UDP packets are used. Otherwise, the query is sent again using the Transmission Control Protocol (TCP). TCP is also used for tasks such as zone transfers. Some resolver implementations directly use TCP for all queries.


# Domain Name System (DNS)

**Domain Name System (DNS)** is a decentralized naming system for resources connected to the Internet or a private network, that associates various information with domain names. More prominently, it translates "easy to remember" domain name to the numerical IP addresses needed for locating and identifying computer services and devices across the Internet.

The most common types of records stored in the DNS database are:
* **IP addresses (A -IPv4- and AAAA -IPv6-)**
* Domain name aliases **(CNAME)**: A **Canonical Name Record** is a type of resource that maps one domain name (an alias) to another (the canonical name). This can prove convenient when running multiple services (such as an FTP server and a web server, each running on different ports) from a single IP address. One can, for example, point *ftp.example.com* and *www.example.com* to the DNS entry for *example.com*, which in turn has an *A record* which point to the IP address. Then if that IP address ever changes, one only has to change the A record. **CNAME** record must always point to another domain name, never directly to an IP address.
* **Start of Authority (SOA) record**: contains administrative information about the zone, especially regarding zone transfers. Normally DNS name servers are set up in clusters. The database within each cluster is synchronized through zone transfers. The SOA record for a zone contains data to control the zone transfer. This is the serial number and different timespans. It also contains the email address of the responsible person for this zone, as well as the name of the primary master name server.
* **SMTP mail exchangers (MX)**: Maps a domain name to a list of *Message Transfer Agents* for that domain. **MTAs** is software that transfers email messages from one comouter to another using **SMTP**.
* Pointers for **reverse DNS lookups (rDNS)**: it is the querying technique of the DNS to determine the domain name associated with an IP address - the reverse of the usual "forward" lookup of an IP address from a domain name.

### Server Hierarchy

DNS records are part of a distributed database. This means all records are not stored at any one server but they are distributed among several global servers.

DBS servers are divided into zones that form a **hierarchy**.

The servers are the top are called **root servers** and they store IP addresses of other DNS servers, called **top level domain servers (TLD)**.

**TLDs** are divided by site-type, i.e. `.com` or `.edu` and they have mappings to **second-level domain servers**, such as a server for `wikipedia.com`. These are the DNS servers that contain mappings to the actual server that host the domain in question.

![](2020-09-01-00-57-58.png)

When a client such as a **browser** is introduced an URL, the lookup goes through a number of steps:

1. The first thing a **browser** does is check with its own **browser cache**, which maintains its DNS records as a cache for a specified amount of time, for sites that have been previously visited. If its there, the IP address is returned.
2. If not, the browser requests the underlying **Operating System (OS)**, to check if the hostname is resolved in the local `hosts` files, whose location varies according to the OS.
3. If is not found there, the browser checks if the domain is found in the **Router Cache**, as they also keep a cache of DNS records.
4. If not found, a further check is done in the **Internet Service Provider (ISP) Cache**, which also keeps DNS records on its cache.

If no results are found in any of the temporary stores, a **full recursive DNS resolution** procedure is started: the **ISP's DNS server** initiates a DNS query to find the IP address of the domain we are looking for.

It is called a **recursive search** because the search will repeatedly continue from a DNS server to DNS server until it either finds the IP address or returns an error saying the domain was not found.

1. The first point of contact between the **DNS resolver** for a full resolution is a **root server**. There are now over a thousand root servers (thanks to anycast), although originally there were only 13.
2. The **root server** returns the **IP address** of the relevant **top-level domain server** (.com, .edu, .org, etc.).
3. The **top-level domain (TLD) server** return the IP address of the second level domain server (wikipedia.com, bds.edu). **TLD servers** tell the resolver to ask the information to **Authoritative Name servers**.
4. The **Authoritative Name servers** or **second-level domain server** contains the **DNS record** of the server we are looking for. The **second-level domain server** returns the IP address to the resolver, which caches it in case the same requests comes again. The resolver then returns the address to the **browser** so it can make the request.

![](2020-09-01-20-27-06.png)

A good way to think of this is that a domain name is resolved in reverse:

![](2020-09-01-19-39-13.png)

Though not usually visible, there is a dot after the URL, which represents the root server. The root server return the address of a top-level domain server, in this case for an `io` server.

The `ui` server then returns the addres to the `educative` DNS server.

Finally, the `educative` DNS server returns the IP address to the educative website.

![](2020-09-01-19-55-12.png)

# HTTP (HyperText Transfer Protocol)

**HTTP (HyperText Transfer Protocol)** is an **Application Layer protocol** for transmitting resources, such as HTML documents. It was designed for communication between web browsers and web server, but it can also be used for other purposes.

HTTP follows a classical **client-server model or protocol**, which means a client opens a connection to make a request, then wait until it receives a response. HTTP is a **stateless protocol**, meaning that the server does not keep any state information between two requests, although it is not **sessionless**.

While **HTTP** is run mostly on **TCP**, it can be used with any reliable Transport Protocol which doesn't silently lose packets (such as UDP).

HTTP is the foundation of data communication for the World Wide Web, where hypertext documents include huyperlinks to other resources that the user can esaily access.

**HTTP/1.1** was first documented at the end of the 90s. **HTTP/2** is a major revision of the protocol that was released in 2015, and left untouched all of the original semantics such as methods, status codes, header fields and URIs. Whit is new is how the data is framed and transported between the client and server.

HTTP/2 allows the server **to push content**, that is, to respond with data for more queries than the client requested. This allows the server to supply data it knows a web browser will need to render a web page, without waiting for the browser to examine the first response, and without the overhead of an additional request cycle.

Additional performance improvments of HTTP/2 come from **multiplexing** of requests and responses on the same TCP connection. However, because it still runs on a single connection, there is still potential for **head-of-line blocking** to occur if TCP packets are lost or delayed in transmission.

## Encryption

HTTP/2 is defined for both HTTP and HTTPS URIs, but although the standard does not require usage of encryption, all major implementations of browsers (Firefox, Chrome, Safari, Opera, Edge) jave stated that they will only support HTTP/2 over TLS, which makes encryption de facto mandatory.

## TLS and SSL

**Transport Layer Security (TLS)** and its now deprecated predecessor **Secure Sockets Layer (SSL)** are cryptographic protocols designed to provide communications security over a computer network. Several versions of the protocols find widespread use in applications such as web browsing, email, instant messaging and voice over IP. Websites can use TLS to secure all communications between their servers and web browsers.

The TLS protocols **aims to provide privact and data integrity** between two or more communicating computer apllications. When secured by TLS, connections between a client and a server should have one or more of the following properties:

* The connections is **private (or secure)** because symmetric cryptography is used to encrypt the data transmitted. The keys for this encryption are generated uniquely for each connection and are based on a shared secret that was negotated at the start of the session, in a **TLS handshake**, before the first byte of data is trasmitted.
* The identity of the communicating parties can be **authenticated** using public-key cryptography.
* The connection is **reliable** because each message transmitted includes a message integrity check using a **message authentication code** to prevent undetected loss or alteration of data during the transmission.

Since applications can communicate either with or without **TLS**, it is necessary for the client to indicate to the server the setup of a TLS connection. One of the main ways of achieving this is to **use a different port number for TLS connections**, for example, port 443 for HTTPS.

Once the client and server have agreed to use TLS, they negotiate a stateful connection by using a handshaking procedure. Once the handshake is done, the secured connection begins, which is encrypted and decrypted with a session key until the connection closes.

TLS and SSL **do not fit neatly** into any single layer of the network stack or the TCP/IP model. TLS runs **on top of a reliable Transport Layer protocol (e.g. TCP)**, which would imply that it is above it.

## HTTP/3

**HTTP/3** is the proposed successor to HTTP/2. It will use UDP instead of TCP for the underlying transport protocol.

## Components of HTTP-based systems

HTTP is a client-server protocol: clients and server communicate by exchanging individual messages (as opposed to a stream of data). The messages sent by the client, usually a Web browser, are called *requests* and the messages sent by the server as an answer are called *responses*.

*Requests* are sent by one entity, the *user-agent* (or a proxy on its behalf). Each individual request is sent to a server, which handles it and provides an answer, called the *response*.

Between the client and the server there are numerous entities, collectively called **proxies**, which perform different operations and act as gateways or caches, for example.

![](2020-09-02-00-33-51.png)

### Client: the user-agent

The **user-agent** is any tool that acts on behalf of the user. This role is primarily performed by web browsers, but tools like Postman, also.

The user-agent is **always** the entity initiating the request, although some new technologies and mechanism allow for server-initiated messages.

To present a Web page, the browser sends an original request to fetch the HTML document that represents the page. It then parses this file, making additional requests corresponding to execution scripts, CSS and subresources such as images and videos. The broswer then mixes these resources to present to the user a complete document, the Web page. Scripts executed by the browser can fetch more resources in later phases and the browser updates the Web page accordingly.

A Web page is a **hypertext document**, which means some parts of it are link which can be activated to fetch a new web page and navigate through the Web.

### Server: the Web server

On the opposite side of the communciation channel is the server, which *serves* the document as requested by the client. It appears as a single machine virtually: this is because it may actually be a collection of server, sharing the load through load balancing, or a complex piece of software interrogating other services (like a cache, a database, etc), generating the requested document on demand.

### Proxies

Between the client and the serves, numerous computers and machines relay the HTTP messages. Due to the layered nature of the **network stack**, most of these operate on the Transport, Internet or Link layers, but those operating on the Application layer are called **proxies**.

**Proxies** can be **transparent** (forward requests they receive without altering in any way), or **non-transparent** (they change the request in some way before passing it forward).

Proxies can perform a number of functions:
* **caching:** the cache can be public or private, like the browser cache
* **filtering:** like an antivirus, firewall or parental control
* **load balancing:** allowing multiple servers to serve a request to a specific resource
* **authentication:** to control access to different resources
* **logging:** allow storage of historical information

## Basic aspects of HTTP

### Simple

HTTP is designed to be **simple and human readable**, even with the added complexity introduced by HTTP/2 by encapsulating the HTTP messages into frames. HTTP messages can be read and understood by humands, providing easier testing and less complexity.

### Extensible

**HTTP headers** make the **protocol easy to extend and experiment with.** New functionality can be introduced with a simple agreement between client and server about a new header's semantics.

### Stateless, but not sessionless

**HTTP is stateless:** there is no link between two requests being successively carried out on the same connection.
While this could mean a problem for users attempting to interacti with certain pages coherently (like an e-commerce basket), **HTTP cookies**, are added to the workflow (thanks to header extensibility), which allow session creation on each HTTP request, maintaining a context.

### Connections

Connections are controlled at the Transport Layer, so out of scope of HTTP. However, it relies on the connection being reliable (not losing packets on the way), therefore HTTP relies on TCP, which is connection-based, and not on UDP.

The default behaviour of HTTP/1.0 was to open a separate TCP connection for each HTTP request/response pair. This is less efficient than sharing a single TCP connection when multiple requests are sin in close succession.

So HTTP/1.1 introduce *pipelining* and *persistent connections*. HTTP/2 went a step further by **multiplexing** messages over a single connection. In HTTP/3 the entire Transport Protocol is expected to be switched to QUIC, which builds on UDP.

## Relaxing the origin constraint (CORS)

**Cross-Origin Resource Sharing (CORS)** is a
https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

## Sessions and Cookies

https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

### WebTokens

[webtokens](https://dzone.com/articles/cookies-vs-tokens-the-definitive-guide)

## HTTP flow and messages

https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview


## HTTP Request Methods

https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

### Idempotent request methods

https://developer.mozilla.org/en-US/docs/Glossary/idempotent

### Safe request methods

https://developer.mozilla.org/en-US/docs/Glossary/safe

## HTTP Response Status Codes

https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

## Cacheable HTTP responses

https://developer.mozilla.org/en-US/docs/Glossary/cacheable




Seguir con Wikipedia

Complementar con MDN

## Cookies, webTokens, etc

## Client-Server models

Comparison to P2P models

## What happens when?

https://medium.com/@maneesha.wijesinghe1/what-happens-when-you-type-an-url-in-the-browser-and-press-enter-bb0aa2449c1a

https://www.freecodecamp.org/news/what-happens-when-you-hit-url-in-your-browser/

https://github.com/alex/what-happens-when

https://afteracademy.com/blog/what-happens-when-you-type-a-url-in-the-web-browser


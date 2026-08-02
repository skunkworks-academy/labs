# Instructor guide - LAB-NET-102

## Purpose

This 55-minute lab helps learners build a reliable troubleshooting order for a common symptom: a device cannot open an internal site. It is designed for Network+-, CCNA- and general TCP/IP-aligned teaching, but it is not an official CompTIA or Cisco assessment.

The learner works only with simulated records. Do not replace the synthetic information with a customer packet capture or production address during a self-paced session.

## Learning outcomes

By the end, a learner should be able to:

1. explain the separate responsibilities of DHCP, DNS and ARP;
2. order a simple client connection from address assignment to local delivery;
3. identify the earliest dependency indicated by a symptom; and
4. name a safe first check and escalation boundary.

## Suggested timing

| Segment | Minutes | Facilitation focus |
| --- | ---: | --- |
| Orientation and dependency model | 10 | Address, name, MAC and gateway are different artefacts. |
| Packet-flow activity | 15 | Ask learners to explain why the order matters. |
| Troubleshooting case | 15 | Insist on testing the earliest failed dependency first. |
| Assessment and completion record | 15 | Review incorrect answers and collect a written triage note. |

## Concepts to reinforce

- DHCP gives an IPv4 client configuration such as an address, subnet mask, default gateway and DNS-server address. It does not resolve a hostname.
- DNS maps a hostname to an address, but a successful DNS response does not prove the endpoint is reachable.
- ARP resolves an IPv4 address to a local link-layer address on the current broadcast domain. A host normally ARPs for the default gateway when the destination is off-subnet.
- A useful initial note contains the observed symptom, time, test scope and the exact evidence. Do not turn a failed lookup into a routing conclusion or start a scan.

## Answer guide

### Checkpoint 1: packet-flow order

Correct answer: start with DHCP/configuration, then DNS for the name, then local delivery/ARP where needed. The key learning point is not that every packet appears in exactly one immutable sequence; it is that the client needs usable configuration before it can ask the configured resolver, and it needs link-layer delivery for the next hop.

### Checkpoint 2: triage case

Correct answer: check whether the client received a valid lease and DNS-server configuration when the trace shows no usable IPv4 configuration. Do not flush a cache, change a gateway or scan a resolver before identifying the missing configuration dependency.

### Knowledge check

| Question | Correct answer | Why |
| --- | --- | --- |
| 1 | DHCP | It supplies client configuration and a lease. |
| 2 | DNS | It maps a requested hostname to an address. |
| 3 | The local next-hop MAC address | ARP is local-link address resolution, not internet-wide name lookup. |
| 4 | Default gateway | An off-subnet destination is sent to the configured next hop. |
| 5 | Record the symptom and verify the assigned configuration | This preserves scope and starts with the earliest dependency. |
| 6 | A DNS answer is evidence of name resolution only | Reachability still depends on routing, policy and the remote service. |
| 7 | Escalate with the trace and observations | A learner should not change or scan a production network without authorisation. |

## Evidence of learning

For an instructor-led cohort, ask for a three-line case note:

1. Symptom and scope;
2. first dependency to verify and the reason;
3. next owner or escalation boundary if it fails.

The browser completion record remains personal and local. It is not a verified competency assessment.

## Accessibility and delivery

- Read the trace aloud before asking learners to select an answer.
- Pair visual colour grouping with explicit labels such as Address, Name and MAC.
- Give learners a text copy of the trace for screen readers or low-bandwidth delivery.
- Encourage a pause-and-explain method: learners should say what each protocol proves and what it does not prove.

## Reference material

- [RFC 2131 - Dynamic Host Configuration Protocol](https://www.rfc-editor.org/info/rfc2131/)
- [RFC 1034 - Domain Names: Concepts and Facilities](https://www.rfc-editor.org/rfc/rfc1034)
- [RFC 826 - Ethernet Address Resolution Protocol](https://www.rfc-editor.org/rfc/rfc826)


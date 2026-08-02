# Instructor guide - LAB-NET-101

## Purpose

Use this 35-minute lab to turn IPv4 subnetting from a memorisation exercise into a visible process. It is suitable before or alongside entry-level CompTIA Network+, Cisco CCNA, Microsoft networking, help-desk, infrastructure, cloud or cybersecurity learning.

The activity deliberately begins with the bit and byte model. Learners then see how a CIDR prefix marks network and host positions, use /26 as a worked example, calculate addresses and usable hosts, and finish with a short assessment.

## Learner profile

- Beginner learners, career starters, support staff and professionals refreshing TCP/IP terminology.
- No account, cloud environment, software installation or command line needed.
- Suitable for self-paced delivery, virtual instructor-led delivery or a short classroom workshop.

## Learning outcomes

By the end of the lab, the learner can:

1. State that IPv4 is 32 bits arranged as four 8-bit octets.
2. Explain that a conventional subnet mask uses binary 1s for network bits and binary 0s for host bits.
3. Translate /26 to 255.255.255.192 and 11111111.11111111.11111111.11000000.
4. Calculate the total addresses in a /26 as 2 to the power of 6, or 64.
5. Calculate ordinary usable hosts in a /26 as 64 - 2, or 62.
6. Find the network, host range and broadcast address for 192.168.10.77/26.
7. Recognise common masks from /24 through /30.

## Suggested facilitation plan

| Time | Activity | Facilitator cue |
| --- | --- | --- |
| 0-4 min | Frame the problem | Ask why 192.168.10.77/26 alone is not enough to identify the network until the prefix is read. |
| 4-8 min | Module 1: IPv4 structure | Have learners say the chain aloud: bit -> 8-bit octet -> 4-octet IPv4 address -> 32 bits. |
| 8-15 min | Module 2: mask explorer | Switch among /24, /25, /26 and /30. Ask learners to spot the contiguous leading 1s and trailing 0s. |
| 15-23 min | Module 3: /26 | Work 192.168.10.77/26 together. Use 256 - 192 = 64 to identify the final-octet blocks 0, 64, 128 and 192. |
| 23-28 min | Module 4: host counts | Learners calculate total values first, then ordinary usable hosts. Reinforce the /31 and /32 exceptions. |
| 28-33 min | Module 5: assessment | Give learners time to retry independently, then discuss the missed concepts. |
| 33-35 min | Wrap-up | Connect the technique to DHCP scopes, VLANs, routing, ACLs, Azure/AWS virtual networks and troubleshooting. |

## Teaching notes

### IPv4, bits and octets

IPv4 has a fixed 32-bit address length. Dotted decimal is a human-readable representation of four consecutive 8-bit octets. Each octet can represent decimal 0 through 255 because 8 bits provide 256 values.

Do not describe a dot as a networking boundary. It is just notation. CIDR prefix lengths can end inside any octet, as /25 through /30 demonstrate in the final octet.

### CIDR mask meaning

For ordinary CIDR masks, the binary pattern is contiguous:

- leading 1s identify the network prefix
- trailing 0s identify the host portion
- /n means there are n network bits

The 1s and 0s do not describe whether a device is online. They describe how to separate a particular address into prefix and host fields.

### /26 worked example

For /26:

- Network bits: 26
- Host bits: 32 - 26 = 6
- Binary mask: 11111111.11111111.11111111.11000000
- Decimal mask: 255.255.255.192
- Total addresses: 2 to the power of 6 = 64
- Ordinary usable hosts: 64 - 2 = 62

The final decimal mask octet is 192. The final-octet block size is 256 - 192 = 64, so a parent /24 contains these /26 blocks:

| Network | Usable host range | Broadcast |
| --- | --- | --- |
| 192.168.10.0/26 | .1 through .62 | .63 |
| 192.168.10.64/26 | .65 through .126 | .127 |
| 192.168.10.128/26 | .129 through .190 | .191 |
| 192.168.10.192/26 | .193 through .254 | .255 |

192.168.10.77 lies in the .64 through .127 block. Its network address is 192.168.10.64, its broadcast address is 192.168.10.127, and its ordinary usable range is .65 through .126.

### Usable-host exceptions

The familiar total - 2 calculation applies to conventional LAN subnets where the all-zero host value is the network address and the all-one host value is the directed broadcast address.

- RFC 3021 permits a /31 on point-to-point links, where both values are usable endpoints.
- A /32 is a host route, not a conventional multi-host subnet.

Make the scope explicit. Learners should learn the ordinary formula first without treating it as a universal rule.

### Common prefixes

| Prefix | Dotted mask | Host bits | Total values | Ordinary usable hosts |
| --- | --- | ---: | ---: | ---: |
| /24 | 255.255.255.0 | 8 | 256 | 254 |
| /25 | 255.255.255.128 | 7 | 128 | 126 |
| /26 | 255.255.255.192 | 6 | 64 | 62 |
| /27 | 255.255.255.224 | 5 | 32 | 30 |
| /28 | 255.255.255.240 | 4 | 16 | 14 |
| /30 | 255.255.255.252 | 2 | 4 | 2 |

## Assessment key

| Question | Correct response | Why |
| --- | --- | --- |
| 1 | 32 | Four 8-bit octets form IPv4. |
| 2 | Network bit | Mask 1s identify the network prefix. |
| 3 | 255.255.255.192 | /26 ends with binary 11000000, or 192. |
| 4 | 6 | 32 - 26 leaves 6 host bits. |
| 5 | 64 | 2 to the power of 6 equals 64 total address values. |
| 6 | 62 | For a conventional LAN subnet, reserve network and broadcast. |
| 7 | 192.168.10.64 | .77 is in the 64-127 /26 block. |

A score of six out of seven completes the lab. Learners can retry without penalty.

## Accessibility and evidence

- All controls are keyboard-operable and feedback is announced through live regions.
- Use the visual diagrams together with the text and calculation, not as the only explanation.
- Progress is stored only in the learner's current browser. Clearing site data or changing browsers resets it.
- The printable record is intentionally not a verified credential, badge or accredited certificate.
- Offer a worksheet or calculator for learners who need additional numeracy support. The intended outcome is repeatable reasoning, not mental-maths speed.

## References

- RFC 4632, Classless Inter-domain Routing (CIDR): The Internet Address Assignment and Aggregation Plan: https://www.rfc-editor.org/rfc/rfc4632
- RFC 3021, Using 31-Bit Prefixes on IPv4 Point-to-Point Links: https://www.rfc-editor.org/rfc/rfc3021

## Recommended next lab

Move into Linux networking, router and switch configuration, TCP/IP troubleshooting or a controlled cloud-network sandbox. Ask learners to apply the same prefix, route and address-scope reasoning to a real interface, VLAN or virtual network.

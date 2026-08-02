# Instructor guide - LAB-NET-201

## Purpose

This 60-minute lab introduces evidence-led packet review using a compact synthetic trace. It is suitable as a bridge from network fundamentals into Wireshark, security operations and forensic work. It is not a live-capture lab and does not authorise learner traffic interception or network probing.

## Learning outcomes

By the end, a learner should be able to:

1. identify a DNS query/answer, TCP three-way handshake and normal close in a timeline;
2. use a display-filter question to narrow review scope;
3. distinguish an observation from an attribution or incident conclusion; and
4. record timestamp, filter, observation and follow-up in an evidence note.

## Suggested timing

| Segment | Minutes | Facilitation focus |
| --- | ---: | --- |
| Capture ethics and timeline model | 10 | Capture authority and scope precede technical analysis. |
| Packet-flow activity | 18 | Tell the story using the packet numbers and time order. |
| Filter and evidence activity | 17 | A filter narrows view; it does not change a PCAP or prove intent. |
| Assessment and completion | 15 | Have learners write one non-speculative finding. |

## Concepts to reinforce

- The three-way TCP handshake is SYN, SYN-ACK, ACK. A connection close can be signalled with FIN/ACK. A trace can show a connection; it does not automatically show what a user intended.
- DNS asks for name-to-address information. A DNS response by itself does not show a successful application transaction.
- Wireshark display filters are for viewing a capture. They differ from capture filters and should be recorded with the question they answer.
- A good case note captures the timeframe, packet identifiers or filter, observation, uncertainty and next authorised action.

## Answer guide

### Checkpoint 1: packet-flow interpreter

Correct answer: the TCP connection is established after SYN, SYN-ACK and ACK. Do not label the later TLS or HTTP metadata as a malicious event without contextual evidence.

### Checkpoint 2: evidence-led triage

Correct answer: use a narrow, relevant display filter such as one based on the client IP and DNS/TCP protocol, record the filter and packet/time range, then ask an authorised owner to correlate with asset, proxy or endpoint logs. Do not attempt a live scan or contact the address.

### Knowledge check

| Question | Correct answer | Why |
| --- | --- | --- |
| 1 | SYN, SYN-ACK, ACK | This is the normal TCP establishment sequence. |
| 2 | DNS response answers a name query | It does not independently prove successful application access. |
| 3 | Display filter | It changes the viewing subset, not the stored packets. |
| 4 | Preserve timeframe, filter and packet observations | This makes the work reproducible. |
| 5 | An observation needing correlation | A destination alone does not establish malicious intent. |
| 6 | Use approved owner/log correlation | The learner has no authority for live action. |
| 7 | Stored synthetic trace only | The lab does not include a live PCAP or target. |

## Evidence of learning

Ask learners to provide:

1. the one-line question their filter answers;
2. the filter or filtering logic they would use;
3. one observed fact and one uncertainty;
4. a next authorised source of corroboration.

## Accessibility and delivery

- Give a high-contrast textual version of the trace.
- Explain TCP flags before the activity.
- Do not grade a learner on memorising one filter spelling if they have expressed a correct narrowing question.

## Reference material

- [Wireshark User's Guide - Display filters](https://www.wireshark.org/docs/wsug_html_chunked/ChWorkDisplayFilterSection.html)
- [Wireshark display-filter manual](https://www.wireshark.org/docs/man-pages/wireshark-filter.html)
- [RFC 9293 - Transmission Control Protocol](https://www.rfc-editor.org/rfc/rfc9293)


# Instructor guide - LAB-DAT-101

## Purpose

Use this 25-minute lab as a practical foundation before learners begin Linux, networking, cloud, programming, cybersecurity or data courses. It replaces memorisation with a working model: learners switch individual bits on and off, calculate the resulting byte, perform conversions, and interpret real-world units.

## Learner profile

- Beginner learners, career starters, non-technical staff or professionals refreshing technical vocabulary.
- No prerequisites, account, cloud environment or software installation.
- Suitable as an individual self-paced activity or a short facilitated introduction.

## Learning outcomes

By the end of the lab, the learner can:

1. State that a bit has two values, `0` and `1`.
2. State that one byte equals eight bits.
3. Use binary place values (`128` through `1`) to calculate an eight-bit decimal value.
4. Convert between bits and bytes using division or multiplication by eight.
5. Explain the difference between `b` and `B`, and between `kB` and `KiB`.

## Suggested facilitation plan

| Time | Activity | Facilitator cue |
| --- | --- | --- |
| 0-3 min | Frame the problem | Ask why a 100 Mbps line does not download at 100 MB/s. Do not answer yet. |
| 3-9 min | Module 1: build a byte | Ask learners to identify which place values form `178`. Confirm `128 + 32 + 16 + 2`. |
| 9-13 min | Module 2: conversions | Have learners say the rule aloud: bits to bytes divide by eight; bytes to bits multiply by eight. |
| 13-18 min | Module 3: notation | Contrast connection rate (`Mbps`) with file-transfer rate (`MB/s`). Explain that real performance also has protocol and storage overhead. |
| 18-23 min | Module 4: assessment | Give learners time to retry without assistance, then discuss any missed question. |
| 23-25 min | Wrap-up | Relate the vocabulary to the next subject: packet sizes, RAM, storage, broadband or encoding. |

## Teaching notes

### Binary place values

An eight-bit byte is read left to right using these weights:

```text
128  64  32  16  8  4  2  1
```

For `10110010`, add the weights under each `1`:

```text
128 + 32 + 16 + 2 = 178
```

Avoid teaching a byte as a character. A byte can represent a number, an encoded text fragment, a colour channel or part of any other data structure; its meaning depends on the format and encoding.

### Bits, bytes and network speeds

Network links are normally advertised in bits per second. A theoretical conversion from Mbps to MB/s is:

```text
MB/s = Mbps / 8
```

This is an upper bound, not a transfer guarantee. Ethernet, Wi-Fi, TCP/IP, encryption, remote storage and application behaviour reduce the real throughput.

### `kB` versus `KiB`

The supplied reference image uses `KB = 1,024 bytes`, a common informal convention. Teach the precise modern distinction:

| Prefix | Exact value | Typical use |
| --- | ---: | --- |
| `kB` | 1,000 bytes | Decimal SI prefix; commonly used by storage vendors. |
| `KiB` | 1,024 bytes | Binary IEC prefix; useful when the base-two relationship matters. |
| `MB` / `MiB` | 1,000,000 / 1,048,576 bytes | Continue the same decimal/binary distinction. |

The important operational habit is to read the unit and the product documentation rather than assume that every `KB` label uses the same convention.

## Assessment key

| Question | Correct response | Why |
| --- | --- | --- |
| 1 | 8 | One byte is eight bits. |
| 2 | 12 bytes | `96 / 8 = 12`. |
| 3 | 32 bits | `4 x 8 = 32`. |
| 4 | `b` = bit, `B` = byte | Letter case changes the unit. |
| 5 | KiB | The IEC binary prefix is explicitly 1,024 bytes. |

A score of four out of five completes the lab. The learner can retry without a penalty.

## Evidence and accessibility

- The lab stores progress in the learner's current browser only. Clearing site data or using a different browser resets it.
- The printable record is intentionally not a verified assessment, badge or certificate.
- All interactions are keyboard-operable; status feedback is announced through live regions.
- Offer a calculator or paper-and-pen alternative for learners with numeracy anxiety. The goal is correct reasoning, not mental arithmetic speed.

## Next recommended lab

Progress to `LAB-LNX-101 - Linux Command-Line Essentials`, where the learner applies the same foundation to file sizes, permissions, terminal output and system administration concepts.

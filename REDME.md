# TrendPulse - Post Analysis Engine

A lightweight JavaScript engine designed to simulate and process social media post data. This project demonstrates advanced JS concepts including asynchronous programming, object manipulation, and data validation using Regular Expressions.

## Technical Features

- Data Modeling: Efficiently transforming raw data using the Spread Operator and Destructuring.
- Safe Data Access: Implementing Optional Chaining (?.) and Nullish Coalescing (??) to prevent runtime crashes.
- Asynchronous Operations: Simulating remote API calls using Promises and async/await.
- Content Analysis: Extracting hashtags, mentions, and validating email formats using Regular Expressions (Regex).
- Date Processing: Converting ISO 8601 strings into human-readable (YYYY-MM-DD) formats.

## Code Structure

| Component           | Responsibility                                                               |
| :------------------ | :--------------------------------------------------------------------------- |
| database            | Mock data object containing sample posts and engagement metrics.             |
| describePostForUi   | Prepares post metadata for frontend display.                                 |
| getEngagementTotals | Safely calculates likes, shares, and comments.                               |
| fetchPostById       | Simulates a database fetch with a 30ms delay.                                |
| analyzePostText     | Parses content for #hashtags and @mentions.                                  |
| runTrendPulsePhase2 | The main orchestrator that processes a batch of posts and returns a summary. |

## Getting Started

1. Ensure you have Node.js installed on your machine.
2. Save the code in a file named index.js.
3. Run the following command in your terminal:

`bash
node index.js

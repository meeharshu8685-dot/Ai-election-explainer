import { ELECTION_QA_DB, ELECTION_QA_EXTRA, FALLBACK_RESPONSE } from '@/lib/constants';

describe('Election Q&A Database', () => {
  it('should have Q&A entries in the main database', () => {
    expect(ELECTION_QA_DB.length).toBeGreaterThan(0);
  });

  it('should have Q&A entries in the extra database', () => {
    expect(ELECTION_QA_EXTRA.length).toBeGreaterThan(0);
  });

  it('each entry should have required fields', () => {
    const allEntries = [...ELECTION_QA_DB, ...ELECTION_QA_EXTRA];
    allEntries.forEach((entry) => {
      expect(entry).toHaveProperty('id');
      expect(entry).toHaveProperty('question');
      expect(entry).toHaveProperty('short_answer');
      expect(entry).toHaveProperty('detailed_answer');
      expect(entry).toHaveProperty('eli18_answer');
      expect(entry).toHaveProperty('keywords');
      expect(Array.isArray(entry.keywords)).toBe(true);
    });
  });

  it('should have greeting keywords in the first entry', () => {
    const greetingEntry = ELECTION_QA_DB.find((qa) =>
      qa.keywords.some((kw) => ['hi', 'hello', 'hey'].includes(kw))
    );
    expect(greetingEntry).toBeDefined();
  });

  it('should have an EVM entry', () => {
    const allEntries = [...ELECTION_QA_DB, ...ELECTION_QA_EXTRA];
    const evmEntry = allEntries.find((qa) =>
      qa.keywords.some((kw) => kw.includes('evm'))
    );
    expect(evmEntry).toBeDefined();
  });

  it('should have a voter registration entry', () => {
    const allEntries = [...ELECTION_QA_DB, ...ELECTION_QA_EXTRA];
    const regEntry = allEntries.find((qa) =>
      qa.keywords.some((kw) => kw.includes('register') || kw.includes('form 6'))
    );
    expect(regEntry).toBeDefined();
  });

  it('FALLBACK_RESPONSE should be a non-empty string', () => {
    expect(typeof FALLBACK_RESPONSE).toBe('string');
    expect(FALLBACK_RESPONSE.length).toBeGreaterThan(10);
  });

  it('all entries should have non-empty detailed answers', () => {
    const allEntries = [...ELECTION_QA_DB, ...ELECTION_QA_EXTRA];
    allEntries.forEach((entry) => {
      expect(entry.detailed_answer.length).toBeGreaterThan(20);
    });
  });
});

describe('Keyword matching logic', () => {
  const ALL_QA = [...ELECTION_QA_DB, ...ELECTION_QA_EXTRA];

  function findAnswer(userMessage: string): string {
    const lower = userMessage.toLowerCase().trim();
    const clean = lower.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ');
    const words = clean.split(' ').filter((w) => w.length > 2);
    let best = null;
    let bestScore = 0;
    for (const qa of ALL_QA) {
      let score = 0;
      for (const kw of qa.keywords) {
        if (clean.includes(kw)) { score += 10; continue; }
        const kwWords = kw.split(' ');
        score += kwWords.filter((k) => words.includes(k)).length * 3;
      }
      const qWords = qa.question.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(' ').filter((w) => w.length > 3);
      score += qWords.filter((qw) => words.includes(qw)).length * 2;
      if (score > bestScore) { bestScore = score; best = qa; }
    }
    if (!best || bestScore < 3) return FALLBACK_RESPONSE;
    return best.detailed_answer;
  }

  it('should match "hello" to greeting entry', () => {
    const result = findAnswer('hello');
    expect(result).not.toBe(FALLBACK_RESPONSE);
  });

  it('should match "what is evm" to EVM entry', () => {
    const result = findAnswer('what is evm');
    expect(result.toLowerCase()).toContain('evm');
  });

  it('should match "how to vote" to voting process entry', () => {
    const result = findAnswer('how to vote');
    expect(result.toLowerCase()).toContain('vote');
  });

  it('should match "voter registration" to registration entry', () => {
    const result = findAnswer('how do I register to vote');
    expect(result).not.toBe(FALLBACK_RESPONSE);
  });

  it('should return FALLBACK for completely unrelated input', () => {
    const result = findAnswer('xyzqwerty12345unrelatednonsense');
    expect(result).toBe(FALLBACK_RESPONSE);
  });
});

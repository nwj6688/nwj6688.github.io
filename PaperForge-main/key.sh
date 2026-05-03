#!/usr/bin/env bash

# ─── LLM API Keys ──────────────────────────────────────────────
# Anthropic native endpoint (used when --claude-protocol anthropic)
export ANTHROPIC_API_KEY='sk-cp-kN1SSTNT3m5bx8kNBrQa43dIlhYUJshAeS03ARtv_B_Wl6pdrRfq0WloHVhgptwea9tTvdLpA0A_tronmrwF4qdPyJcsmJsuvIFAVjVc5xihrm4YaE1VlMk'
export ANTHROPIC_BASE_URL='https://api.minimaxi.com/anthropic'

# ─── Literature Search ─────────────────────────────────────────
export OPENALEX_MAIL_ADDRESS='user@example.com'

# ─── Writeup Controls ──────────────────────────────────────────
export WRITEUP_CITE_ROUNDS='4'
export WRITEUP_LATEX_FIX_ROUNDS='2'
export WRITEUP_SECOND_REFINEMENT='0'

# ─── Plotting (Windows stability) ──────────────────────────────
export MPLBACKEND='Agg'

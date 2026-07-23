## Projects

### Drumbeat Atlas, Drumbeat Labs <span class="date">2026</span>

- Architected a social media data collection pipeline feeding into a post-centric corpus on Cloudflare D1, incorporating a Python FastAPI deployed as a Cloudflare Worker, scheduled GitHub Actions to automate fetches, and a React frontend
- Enriched each post with audio transcriptions, OCR, embeddings, clustering, sentiment scoring using open-source models
- Compared campaign and non-campaign posts within semantic clusters, attributing engagement signal to follower counts, negative post sentiment, and topic-dependent embedding dimensions
- Explored engagement drivers with random forests, permutation importance, and Spearman/Pearson correlations
- Diagnosed a recency and depth bias in the Scrape Creators fetch API and scoped temporal claims to the recent window it tends to return

### Drumbeat Viewer, Drumbeat Labs <span class="date">2026</span>

- Built an in-browser interface for Drumbeat Atlas exports of post text embeddings, sentiment analysis, and metadata
- Renders the UMAP embedding projection colored by any field via DuckDB-wasm + Mosaic + vgplot
- Links density distribution plots that crossfilter the map in real time, with interval brushes that highlight the selection
- A heatmap strip reports the live deviation from corpus mean and correlations with the colored variable over the current selection

### BEDbase + gtars, University of Virginia <span class="date">2026</span>

- Built an updated web interface for bedbase.org, incorporating an interactive UMAP embedding viewer
- Live-rendered Observable Plot visualizations replace our precomputed ones from ggplot2
- Drove the porting of the lab's algorithms into Rust + WASM bindings to facilitate these features

### Genomic Regions, University of Virginia <span class="date">2026</span>

- Built an interactive multi-panel explorer for Region2Vec genomic region embeddings incorporating linked UMAPs, chromosome distributions, and region co-occurrence plots
- Explored spatial relationships between region embedding tokens as a provisional grammar of regulatory genomics

## Experience

### Bioinformatician, University of Virginia <span class="date">2024 — Current</span>

- Built interactive user and data visualization interfaces for tools published by Sheffield Lab
- Developed Refget SCOM interface to visualize comparisons between genomic sequence collections via Vega-Lite
- Ran statistical analyses (stratified GWAS + pQTL colocalization) to identify credible signals for sex differences in lung function
- Investigated markers of abnormal lobe function and transplant rejection using single-cell gene expression in human lung
- Engineered a single-cell RNAseq pipeline for integration with agentic AI, incorporating a canonical config source, machine-readable output summaries, and pipe-friendly I/O
- Contributed to pilot study exploring genetic sources of biological age gap within human proteome and transcriptome (biological age prediction + GWAS)

### Automation Engineer, Merck & Co. (Contract) <span class="date">2022 — 2025</span>

- Helped lead automation community project incorporating R Shiny, plumber API, AWS, and PI Web API to automate manual continuous historian report writing process, eliminating 500+ manually-written reports per year
- Developed initial proof of concept for continuous historian report tool that served as foundation for codebase
- Worked on automated data pipelines that use R Markdown and PI Web API to manage factory data on AWS S3 and RDS

## Skills

<div class="skills">
<p><strong>Languages &amp; Data:</strong> R, Python, JavaScript, TypeScript, SQL<br>
<strong>Statistics &amp; Experimentation:</strong> causal inference, statistical measurement, linear regression<br>
<strong>Machine Learning:</strong> embeddings, clustering, sentiment analysis, random forest, permutation importance<br>
<strong>Data Visualization:</strong> Vega-Lite, Mosaic/vgplot, Observable Plot, D3, ggplot2<br>
<strong>Infrastructure:</strong> React, React Router, Zustand, FastAPI, Cloudflare, GitHub Actions, DuckDB</p>
</div>

## Education

<div class="edu">
<p><strong>University of Virginia</strong></p>
<p>Master of Science (Aug 2026). Program: Data Science<br>
Bachelor of Science (May 2022). Major: Biomedical Engineering | Minor: Computer Science</p>
</div>

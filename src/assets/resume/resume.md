Data Scientist at the University of Virginia with four years of research and industry experience across large text corpora, genomics, and industrial process data. Experienced in data collection, analysis, and interactive interfaces. Available Fall 2026.

## Projects

### Drumbeat Atlas, Drumbeat Labs (Capstone) <span class="date">2026</span>

- Research question: how can we measure the impact of targeted creator campaigns on organic social media?
- Architected and deployed a social media analysis pipeline on Cloudflare and GitHub Actions to collect a 37,000-post corpus across several campaign topics
- Transcribed spoken audio and on-screen text of each post for text embeddings, clustering, and sentiment scoring
- Found views are driven by follower count and post age while engagement is associated with semantic content
- Trained embedding probes using logistic regression for five content categories at held-out AUC 0.80 to 0.91, finding posts that name wrongdoing draw the strongest engagement in two sponsored campaigns
- Identified a recency bias in the Scrape Creators API and scoped temporal claims accordingly
- Built a [web interface](https://drumbeat-viewer.pages.dev) in React for post embeddings, sentiment, and metadata to support real-time exploratory demos
- Interface renders the UMAP embedding projection client-side via DuckDB-wasm + Mosaic + vgplot so that all computations for selections, brushes, and crossfilters occur instantly in-browser
- Interface reports live deviations from corpus mean and feature correlations over the current selection in a heatmap strip

### BEDbase + gtars, University of Virginia <span class="date">2026</span>

- Built an updated web interface in React for [BEDbase](https://bedbase-ui.nsheff.workers.dev/), incorporating an interactive UMAP embedding viewer
- Live-rendered Observable Plot visualizations replace our precomputed ones from ggplot2
- Drove the porting of the lab's algorithms into Rust + WASM bindings to facilitate these features

### Genomic Regions, University of Virginia <span class="date">2026</span>

- Explored spatial relationships across one million+ pretrained Region2Vec genomic region embeddings
- Annotated genomic regions by transcription factor binding across three cell lines, recovering erythroid, hepatocyte, and B-cell programs unsupervised
- Built an interactive [multi-panel explorer](https://sanghoonio.github.io/genomic-regions/) in React for region embeddings incorporating linked UMAPs, chromosome distributions, and region co-occurrence plots

## Experience

### Bioinformatician, University of Virginia <span class="date">2024 — Current</span>

- Built interactive user and data visualization interfaces for tools published by Sheffield Lab
- Developed [Refget SCOM](https://refget.databio.org/scom) interface to visualize comparisons between genomic sequence collections via Vega-Lite
- Ran stratified GWAS and pQTL colocalization analyses to identify credible signals for sex differences in lung function
- Investigated markers of abnormal lobe function and transplant rejection using single-cell gene expression in human lung
- Engineered a [single-cell RNAseq pipeline](https://github.com/sanghoonio/seurat-pipeline) for agentic AI integration with canonical configs, machine-readable outputs, and pipe-friendly I/O
- Contributed to pilot study using biological age prediction and GWAS to explore genetic sources of biological age gap within human proteome and transcriptome

### Automation Engineer, Merck & Co. (Contract) <span class="date">2022 — 2025</span>

- Helped lead automation community project incorporating R Shiny, plumber API, AWS, and PI Web API to automate manual continuous historian report writing process, eliminating 500+ manually-written reports per year
- Developed initial proof of concept for continuous historian report tool that served as foundation for production codebase
- Worked on automated data pipelines that use R Markdown and PI Web API to manage factory data on AWS S3 and RDS

## Skills

<div class="skills">
<p><strong>Languages &amp; Data:</strong> R, Python, JavaScript, TypeScript, SQL<br>
<strong>Statistics &amp; Measurement:</strong> permutation testing, effect estimation, linear regression<br>
<strong>Machine Learning:</strong> text embeddings, supervised classification and probing, PCA, UMAP, clustering, random forest<br>
<strong>Data Visualization:</strong> Vega-Lite, Mosaic/vgplot, Observable Plot, D3, ggplot2, Tableau<br>
<strong>Infrastructure:</strong> React, FastAPI, Cloudflare, GitHub Actions, DuckDB, AWS, R Shiny, plumber API, Streamlit</p>
</div>

## Education

<div class="edu">
<p><strong>University of Virginia</strong></p>
<p>Master of Science (Aug 2026). Program: Data Science<br>
Bachelor of Science (May 2022). Major: Biomedical Engineering | Minor: Computer Science</p>
</div>

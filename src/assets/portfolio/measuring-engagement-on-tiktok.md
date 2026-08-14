---
title: Measuring Engagement on TikTok
desc: investigating organic social media campaigns
---

For my capstone project, I worked with [Drumbeat Labs](https://www.hellodrumbeat.com/), a marketplace connecting mission-driven organizations with everyday creators. These organizations reach the public through organic short-form video across focused campaigns rather than paid advertising. Though existing marketing services offered by social media platforms allow stakeholders to run targeted ads and provide automated performance metrics, Drumbeat's vision is to focus on organic content that runs outside of this framework. To support their needs, we built a pipeline that collects and processes campaign posts, and an analysis stack to investigate where campaign posts sit in the conversation and identify the kinds of posts that are more likely to get engaged with.

## The data pipeline

![The Atlas data pipeline, from collection through transcription, embedding and clustering, to sentiment scoring](/figures/capstone/fig2_data_pipeline.webp "Our data pipeline, Atlas. The collection part of the pipeline is deployed to Cloudflare and GitHub Actions, while the heavier compute, which includes transcription and sentiment scoring, stays local.")

In NLP, using text embeddings is a common approach to quantify relationships between elements in a corpus. In our pipeline, we use Scrape Creators to fetch metadata for each post, including its caption, and open-source models to transcribe the spoken audio and read the on-screen text. This gives us three modalities of text per post. We concatenate these for the embeddings, giving an aggregate representation of each post in the semantic space. We also use open-source lexicons and transformer-based models to score sentiment and affect for each text modality. The separation helps account for possible differences in tone across modalities within a post.

## Two campaign datasets

We ran the pipeline on two official Drumbeat campaigns. One covers affordability and cost of living in Georgia and is still ongoing, with 10,555 posts over 117 days and 175 campaign-affiliated posts. The other covers the anniversary of the Dobbs Supreme Court decision and reproductive rights, with 3,541 posts and 35 campaign posts. Both analyses were on TikTok, and five smaller campaigns were fetched with the same pipeline for exploration.

## The shape of the conversation

![Embedding map of the Georgia Affordability corpus, with campaign posts and per-cluster detail](/figures/capstone/fig_finding1.webp "Leiden clustering on the embedding kNN graph, projected with UMAP.")

Our embedding approach produces good separation and distinct clusters of posts across campaign topics. Inspired by single-cell sequencing methods, we used the Leiden algorithm to identify campaign subtopics from the embeddings, and topics generally group into 13 to 16 clusters. For Georgia Affordability, 94% of the campaign's posts fall into 3 of 16 clusters. Gas prices and data centers sit furthest from the rest of the corpus, at cluster centroid cosine distances of 0.097 and 0.082 from the corpus mean. 

One caveat of our results is that the corpus and embedding projections are always biased by our selection of queries for a given campaign topic, and what Scrape Creators or TikTok return in response. As nicely shaped or comprehensive the embedding space may look, the posts themselves fetched in our corpus are not fully representative of the conversation as it ocurred on TikTok. More on this later.

## Interpreting the shapes of latent embeddings

![Probing the embedding space with five manually defined categories and their engagement coefficients](/figures/capstone/fig_finding2.webp "Categories are recoverable from the embedding dimensions, and their engagement signs are consistent across both campaigns.")

The field simultaneously uses embeddings for quantified representations of concepts and lacks the mechanisms to describe what the dimensions truly mean. There are proxy methods though, like probing for concepts we define by hand. In our case, we probed the embedding space for five discrete categories: **personal conviction**, **naming wrongdoing**, **institutional report**, **transactional listing**, and **playful humor**. We used LLMs to label posts as we trained a logistic regression on a steadily growing training set, using the raw embedding dimensions as predictors. We stopped at 665 posts once the learning curves plateaued, and the resulting probes did fairly well on the test set of 200 posts. Institutional report and naming wrongdoing are the most recoverable, at AUC 0.91 and 0.90, then transactional listing at 0.85, playful humor at 0.81, and personal conviction at 0.80. We then scored every post with the probes and estimated each category's association with engagement per view, controlling for follower count, video duration, post age, and cluster. Naming wrongdoing carries the strongest positive association in both campaigns, which suggests attributability is what viewers respond to, at least for these kinds of topics.

## Signals of engagement and views

![Feature correlations, permutation importance, and per-cluster variation for engagement and views](/figures/capstone/fig_finding3.webp "Views and engagement rate have different predictors. Notice the double negatives for PC2 and PC7 when it comes to keyword correlations associated with engagement.")

We modeled views and engagement separately with random forests, using metadata, embedding PCs, and sentiment scores as features. Views were predictable at cross-validated R² 0.32 (GA) and 0.28 (Dobbs), mostly from follower count and post age. Engagement rate was harder to predict at 0.15 (GA) and 0.08 (Dobbs), and leaned on semantic content instead. Looking at the words correlated with each component, we see political vocabulary on the more engaged end of PC2 and PC10, and profanity on the more engaged end of PC7. These associations provide further evidence that emotionally charged, attributing content resonates better with viewers.

## On social media data

Overall, our sponsors found our results helpful, especially the embedding projections, when it came to calibrating campaigns to current topics and providing partners an intuitive deliverable that scopes out the conversation space. Something we noticed almost right away was the limitation of being a third-party consumer of scraped data. We fetched our data using specific phrase and hashtag queries with Scrape Creators, which itself relies on TikTok search algorithms to return posts. All queries, regardless of the topic, returned heavily recency-biased responses where posts with low views were missing almost entirely beyond several months prior to the query date. Furthermore, most queries started returning only duplicate posts past a consistent pagination value. This is certainly due to how TikTok prioritizes certain kinds of posts, in terms of semantic query relevance, popularity, and recency. We wouldn't know how these features are actually weighted, but our results are as much a characterization or distillation of platform recommendation algorithms as they are a measurement of trends in online conversations.

Social media activity is highly unregulated, with an infinite number of external factors able to influence how users interact with posts, which compound with the undocumented algorithms that bias what users are able to see in the first place. There is kind of a chicken-and-egg thing going on here, and for the public it is rather inconvenient that both the online record of modern human activity and the way these platforms facilitate it are gated so ambiguously. But the platforms themselves have an incredible moat of value. It would be great to see the data being used more for public service and awareness, like YouTube Rewind but for social research and historical recordkeeping.


---
title: "Predicting emergency admissions in Scotland: SPARRAv4 and beyond"
---

# Background

SPARRA (Scottish Patients At Risk of Readmission and Admission) is a risk 
prediction model used across Scotland to identify individuals at a high risk of 
requiring urgent hospital care within the next year. The model was originally 
developed by <strong>[Public Health Scotland (PHS)](https://www.publichealthscotland.scot)</strong> 
and SPARRA scores are calculated monthly for approximately 80% of Scottish residents. 

<br>

Individual-level SPARRA scores can be used by medical professionals to plan 
anticipatory interventions for the patients under their care. At an aggregate 
level, SPARRA scores may also be used to estimate future demand, supporting 
planning and resource allocation. 

<br>

More information about SPARRA and its use 
cases is provided by PHS 
<strong>[here](https://publichealthscotland.scot/resources-and-tools/health-intelligence-and-data-management/scottish-patients-at-risk-of-readmission-and-admission-sparra/overview/)</strong>.

<br>

# SPARRAv4

<img src = "/assets/img/sparra/sparrabyscriberia.webp" width = "600">

<br>

SPARRA version 4 (SPARRAv4) is the latest version of the SPARRA model, developed 
by our team in collaboration with PHS. Supported by 
<strong>[The Alan Turing Institute](https://www.turing.ac.uk)</strong> and 
<strong>[Health Data Research UK](https://www.hdruk.ac.uk)</strong>, the project 
was co-led by Dr Catalina Vallejos and 
<strong>[Prof Louis Aslett (Durham)](https://www.louisaslett.com)</strong>. 

<br>

Similar to its predecessors, SPARRAv4 inputs include demographic data 
(such as the Scottish Index of Multiple Deprivation) together information 
that is routinely collected by healthcare providers (such as patient history, 
prescription details and previous hospital admissions). 

<br>

A key difference with respect to earlier versions is the underlying modelling 
approach. SPARRAv4 uses a topic model to extract more granular information from 
prescriptions and diagnostic data. Furthermore, it uses an ensemble of machine 
learning models (including boosted decision trees and neural networks) to 
capture more complex data patterns. 

<br>

Trained on electronic health records from 4.8 million residents between 2013 
and 2018, our updated model provides improved predictive performance than 
SPARRAv3. Our analysis also gives insights into the epidemiology of emergency
admissions in Scotland; for example, types of admissions (as defined by the
recorded primary diagnosis) that are harder to predict. 

<br>

Throughout model development, our team placed high emphasis on transparency and 
reproducibility while ensuring compliance with data governance constraints. 
This includes the use of
<strong>[TRIPOD reporting guidelines](https://www.tripod-statement.org/)</strong> 
and open-source code. 

<br>

SPARRAv4 will be soon deployed by PHS across Scotland, replacing SPARRAv3. 

<br>

<ul style="list-style-type: circle;"> 
  <li>
  Paper: <a href="https://www.nature.com/articles/s41746-024-01250-1"><strong>Liley et al (2024), npj Digital Medicine</strong></a>. 
  </li>
  <li>
  Code: <a href="https://github.com/jamesliley/SPARRAv4"><strong>Publicly available in GitHub</strong></a>.
  </li>
  <li>
  Press release: <a href="https://www.ed.ac.uk/news/2024/ai-tool-predicts-emergency-hospital-risk"><strong>AI tool predicts emergency hospital risk </strong></a>.
  </li>
</ul>

<br>
  
# Stratified performance of SPARRA

We carried out a retrospective analysis to comprehensively evaluate how SPARRA 
(versions 3 and 4) performs across population subgroups defined by age, sex, 
ethnicity, socioeconomic deprivation, and geographic location (rural vs urban, 
island vs mainland residence). 

<br>

We considered differences in overall predictive performance (including 
discrimination and calibration) and score distribution, using causal methods to 
identify effects mediated through age, sex, and deprivation.

<br>

Our online dashboard enables researchers, practitioners and members of the 
public to explore these results interactively.

<br>

In addition to <strong>[The Alan Turing Institute](https://www.turing.ac.uk)</strong> 
and <strong>[Health Data Research UK](https://www.hdruk.ac.uk)</strong>, this 
work was also supported by 
<strong>[The Health Foundation](https://www.health.org.uk/funding-and-partnerships/our-partnerships/data-driven-systems-and-health-inequalities)</strong>
as part of the Data-Driven Systems and Health Inequalities programme. 

<br>

<ul style="list-style-type: circle;"> 
  <li>
  Paper: <a href="https://journals.plos.org/digitalhealth/article?id=10.1371/journal.pdig.0000675"><strong>Thoma et al (2024), PLoS Digital Health </strong></a>. 
  </li>
  <li>
  Code: <a href="https://github.com/Public-Health-Scotland/sparra-performance-analysis"><strong>Publicly available in GitHub</strong></a>.
  </li>
  <li>
  Online dashboard: <a href="https://github.com/Public-Health-Scotland/sparra-performance-analysis"><strong>Available in PHS website</strong></a>.
  </li>
  <li>
  R package: <a href="https://cran.r-project.org/web/packages/SPARRAfairness/index.html"><strong>Available in CRAN</strong></a>.
  </li>
</ul>

<br>

# Related work inspired by SPARRA

Beyond work directly related to the development and evaluation of SPARRA, our 
team has also developed methodological and ethical challenges related to the use 
and updating of SPARRA and similar risk prediction models. 

<br>

### Model updating after interventions

Machine learning is increasingly being used to generate prediction models that 
inform interventions in real-world settings; for example, anticipatory care 
plans informed by SPARRA. In parallel, there is increasing interest in updating 
and improving such models over time, as more data becomes available and 
modelling techniques improve: interventions informed by a risk score can alter
the outcome they were trying to predict, leading to a feedback loop that is
often referred to as 'performative prediction'. 

<br>

We demonstrate the consequences of 'naive updating', where performative 
prediction is not accounted for when updating a model, and this is done 
repeatedly over time. We also discuss potential routes to overcome these issues.

<br>

<ul style="list-style-type: circle;"> 
  <li>
  Paper: <a href="https://proceedings.mlr.press/v130/liley21a.html"><strong>Liley et al (2021), AISTATS</strong></a>. 
  </li>
  <li>
  Code: <a href="https://github.com/jamesliley/model_updating"><strong>Publicly available in GitHub</strong></a>.
  </li>
</ul>

<br>

### Ethical considerations of use of hold-out sets in model updating

We explore the potential use of 'hold-out sets', in which a set of patients do 
not receive model derived risk scores, as a potential solution to address 
performative effects in the context of model updating. 

<br>

We present an overview of clinical and research ethics in this context, focusing 
on the ethical principles of beneficence, non-maleficence, autonomy and justice.
We also consider informed consent and the principle of clinical equipoise, and 
present illustrative cases of potential hold-out set implementations. 

<br>

<ul style="list-style-type: circle;"> 
  <li>
  Paper: <a href="https://link.springer.com/article/10.1007/s43681-024-00561-z"><strong>Chislet et al (2024), AI and Ethics</strong></a>. 
  </li>
</ul>

<br>

### Adaptive model updating using a simulated environment

We consider the general challenge of model updating in the presence of concept 
drift, where the underlying distribution of the data changes over time. We review
existing strategies, including regular model updates (e.g. yearly) as well as
those triggered by concept drift detection. 

<br>

We present a novel strategy, AMUSE (adaptive model updating using a simulated 
environment) to balance the costs and benefits associated to model updating. 
Our key idea is to use a simulated training environment in which possible 
episodes of drift are simulated by a parametric model. A reinforcement learning 
is then used to learn an optimal updating strategy.

<br>

<ul style="list-style-type: circle;"> 
  <li>
  Pre-print: <a href="https://arxiv.org/abs/2412.10119"><strong>Chislet et al (2024), arXiv</strong></a>. 
  </li>
</ul>

<br>

# Group members

Current and former group members that have contributed to this project:

<br>

- Dr Catalina Vallejos (group leader)
- Dr James Liley (former PDRA)
- Dr Ioanna Thoma (former PDRA)
- Louis Chislett (PhD student)
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

A key difference with respect of the previous version of the model (SPARRAv3) is 
the underlying modelling approach. SPARRAv4 uses a topic model to extract more 
granular information from prescriptions and diagnostic data. Furthermore, it uses 
an ensemble of machine learning models (including boosted decision trees and 
neural networks) to capture more complex data patterns. 

<br>

Trained on electronic health records from 4.8 million residents between 2013 
and 2018, our updated model provides improved predictive performance than 
SPARRAv3. Our analysis also gives insights into the epidemiology of emergency
admissions in Scotland; for example, types of admissions (as defined by the
recorded primary diagnosis) that are harder to predict. 

<br>

Throughout model development, our team placed high emphasis on transparency and 
reproducibility while ensuring compliance with data governance constraints. 
This includes the use of TRIPOD reporting guidelines and open-source code. 

<br>

## Links

<ul style="list-style-type: circle;"> 
  <li>
  Paper: [Liley et al (2024), npj Digital Medicine](https://www.nature.com/articles/s41746-024-01250-1). 
  </li>
  <li>
  Code: [jamesliley/SPARRAv4](https://github.com/jamesliley/SPARRAv4)
  </li>
</ul>
  
- [Press release: AI tool predicts emergency hospital risk](https://www.ed.ac.uk/news/2024/ai-tool-predicts-emergency-hospital-risk).
- [SPARRAv4 GitHub code repository](https://github.com/jamesliley/SPARRAv4)
- [TRIPOD reporting guidelines](https://www.tripod-statement.org/)
- [SPARRA overview by PHS](https://publichealthscotland.scot/resources-and-tools/health-intelligence-and-data-management/scottish-patients-at-risk-of-readmission-and-admission-sparra/overview/).

# Stratified performance

TBC

# Related work inspired by SPARRA

TBC

# Group members

Several current and former members of the Biomedical Data Science research group 
have contributed to this project:

- Dr James Liley (former PDRA)
- Dr Ioanna Thoma (former PDRA)
- Louis Chislett (PhD student)
---
name: properties-object-language
description: Configurable language properties
---

Use this file to define editable properties, defaults, and valid options for this target.

---

# GENERAL
Include [General](./properties-common.md) properties

## Parent language
- Description: Language object name of which this one is a specialization
- Type: `string`

## ISO Language Code
- Description: ISO language identifier
- Type: `enum{AA,AB,AF,AM,AR,AS,AY,AZ,BA,BE,BG,BH,BI,BN,BO,BR,CA,CO,CS,CY,DA,DE,DZ,EL,EN,EO,ES,ET,EU,FA,FI,FJ,FO,FR,FY,GA,GD,GL,GN,GU,HA,HI,HR,HU,HY,IA,IE,IK,IN,IS,IT,IW,JA,JI,JW,KA,KK,KL,KM,KN,KO,KS,KU,KY,LA,LN,LO,LT,LV,MG,MI,MK,ML,MN,MO,MR,MS,MT,MY,NA,NE,NL,NO,OC,OM,OR,PA,PL,PS,PT,QU,RM,RN,RO,RU,RW,SA,SD,SG,SH,SI,SK,SL,SM,SN,SO,SQ,SR,SS,ST,SU,SV,SW,TA,TE,TG,TH,TI,TK,TL,TN,TO,TR,TS,TT,TW,UK,UR,UZ,VI,VO,WO,XH,YO,ZH,ZU}`
- Default: `EN`

## ISO Country Code
- Description: ISO country identifier
- Type: `enum{AF,AX,AL,DZ,AS,AD,AO,AI,AQ,AG,AR,AM,AW,AU,AT,AZ,BS,BH,BD,BB,BY,BE,BZ,BJ,BM,BT,BO,BA,BW,BV,BR,IO,BN,BG,BF,BI,KH,CM,CA,CV,KY,CF,TD,CL,CN,CX,CC,CO,KM,CG,CD,CK,CR,CI,HR,CU,CY,CZ,DK,DJ,DM,DO,EC,EG,SV,GQ,ER,EE,ET,FK,FO,FJ,FI,FR,GF,PF,TF,GA,GM,GE,DE,GH,GI,GR,GL,GD,GP,GU,GT,GN,GW,GY,HT,HM,HN,HK,HU,IS,IN,ID,IR,IQ,IE,IL,IT,JM,JP,JO,KZ,KE,KI,KP,KR,KW,KG,LA,LV,LB,LS,LR,LY,LI,LT,LU,MO,MK,MG,MW,MY,MV,ML,MT,MH,MQ,MR,MU,YT,MX,FM,MD,MC,MN,MS,MA,MZ,MM,NA,NR,NP,NL,AN,NC,NZ,NI,NE,NG,NU,NF,MP,NO,OM,PK,PW,PS,PA,PG,PY,PE,PH,PN,PL,PT,PR,QA,RE,RO,RU,RW,SH,KN,LC,PM,VC,WS,SM,ST,SA,SN,CS,SC,SL,SG,SK,SI,SB,SO,ZA,GS,ES,LK,SD,SR,SJ,SZ,SE,CH,SY,TW,TJ,TZ,TH,TL,TG,TK,TO,TT,TN,TR,TM,TC,TV,UG,UA,AE,GB,US,UM,UY,UZ,VU,VA,VE,VN,VG,VI,WF,EH,YE,ZM,ZW}`
- Default: `US`

## Codepage
- Description: ANSI code page associated to this language
- Type: `int`

## Language localization
- Description: Localization identifier or resource key
- Type: `string`

## Date format
- Description: Date format convention
- Type: `enum{ENG,POR,SPA,ITA,ANSI}`
- Default: `ENG`
- Options:
  - `ENG`: English
  - `POR`: Portuguese
  - `SPA`: Spanish
  - `ITA`: Italian
  - `ANSI`: ANSI (Y/M/D)

## Time format
- Description: Time format convention
- Type: `enum{12,24}`
- Default: `12`
- Options:
  - `12`: 12 hour format
  - `24`: 24 hour format

## Decimal separator
- Description: Decimal separator symbol
- Type: `enum{Point,Comma}`
- Default: `Point`
- Options:
  - `Point`: Use point ('.')
  - `Comma`: Use comma (',')
# 院校招生数据说明 · 2026/27

本文件记录 Gift Edition 第三阶段使用的院校招生信息来源与核实原则，方便以后更新到 2027/28。

## 核实原则

1. 优先使用院校官网、院校招生系统、院校官方 PDF 或俄罗斯官方文化机构页面。
2. 2026/27 已结束的信息保留为“已核实基准”，不包装成下一年度的确定日期。
3. 没有在当前官方材料中核实到的曲目、语言等级或日期，页面会明确写“需确认”，不使用中介文章或旧年份材料补空白。
4. 下一招生周期开始后，应优先更新：材料截止日、考试时间、声乐曲目、俄语要求、外国申请者材料认证要求、学费与名额。

## 院校与来源

### 莫斯科国立柴可夫斯基音乐学院
- https://www.mosconsv.ru/ru/groups/21436
- https://www.mosconsv.ru/abitur/special/
- 核实：2026 材料期、外籍联系方式、考试语言、声乐预听、专家制声乐入口。

### 圣彼得堡国立里姆斯基-科萨科夫音乐学院
- https://www.conservatory.ru/education/inostrannym-studentam
- https://www.conservatory.ru/education/inostrannym-studentam/bakalavriat-530303-vokalnoe-iskusstvo
- https://www.conservatory.ru/education/inostrannym-studentam/vokalno-rezhisserskiy-fakultet
- 核实：外国申请者声乐层级、专业考试、俄语作为外语、2026 分项目考试日期。

### 俄罗斯格涅辛音乐学院
- https://gnesin-academy.ru/admission/campaign/bachelor-2026/
- https://gnesin-academy.ru/admission/campaign/bachelor-2026/?page=entrance-tests
- 核实：2026 材料期、考试期、53.03.03 学院派声乐考试科目、形式与最低分。

### 喀山国立日加诺夫音乐学院
- https://new.kazancons.ru/section/144
- https://new.kazancons.ru/sveden/education
- https://new.kazancons.ru/section/101
- 核实：2026/27 外国申请者入口、本科 53.03.03、硕士 53.04.02 与俄语要求入口。

### 新西伯利亚国立格林卡音乐学院
- https://www.nsglinka.ru/abitur/bachelor/
- 核实：2026 材料期、考试期、53.03.03 学院派声乐及专业/理论/俄语/文学考试结构。

### 乌拉尔国立穆索尔斯基音乐学院
- http://www.uralconsv.org/
- https://www.culture.ru/institutes/27540/uralskaya-gosudarstvennaya-konservatoriya-imeni-m-p-musorgskogo
- 核实：院校身份、官网、招生委员会联系方式；当前未稳定读取完整 2026 声乐招生细则，因此页面标记为“部分核实”。

### 下诺夫哥罗德国立格林卡音乐学院
- https://nnovcons.ru/files/priem2026/Pravila_priema_2026.pdf
- https://pk.nnovcons.ru/rating/specialties
- 核实：2026/27 官方招生规则、外国申请者适用范围、本科/专家制时间线；声乐专业曲目仍需当届附件。

### 萨拉托夫国立索比诺夫音乐学院
- https://sarcons.ru/foreign_student/program/singing/
- 核实：外国声乐本科考试、曲目结构、俄语 B1、预科路径与材料期。

### 罗斯托夫国立拉赫玛尼诺夫音乐学院
- https://rostcons.ru/entrant/entrant2026.html
- https://rostcons.ru/entrant/requirements/baccalaureate/dep_solo_bac.html
- https://rostcons.ru/entrant/specialty.html
- 核实：2026 招生入口、53.03.03 / 53.04.02 / 53.09.02 声乐路径以及当年专业考试程序入口。

## 更新建议

2027/28 招生季开始后，直接修改 `app/data/conservatories.js` 即可。每所学校的 `verification.asOf`、`timeline`、`language`、`vocalExam`、`repertoire` 和 `sources` 都应一起更新，避免出现“日期更新了但考试要求仍是旧年份”的混合状态。

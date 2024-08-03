# Kalkulačka v JavaScriptu

Tento projekt je jednoduchá kalkulačka napsaná v JavaScriptu, která umožňuje provádět základní aritmetické operace: sčítání, odčítání, násobení a dělení. Projekt demonstruje použití JavaScriptu pro vytváření interaktivních webových aplikací s jednoduchou logikou a uživatelským rozhraním.

## Analýza zvoleného řešení

V tomto projektu jsem zvažoval několik možných řešení pro vytvoření kalkulačky v JavaScriptu. Níže jsou uvedeny dvě hlavní varianty, které jsem zvažoval, a jejich výhody a nevýhody.

### 1) Řešení s použitím jednotlivých operací

Toto řešení umožňuje provádět výpočty s maximálně dvěma operandy, které se provádějí jeden po druhém.

- Například výpočet 5 + 10.

**Výhody:**

- Snadné na implementaci.

**Nevýhody:**

- Nelze provádět výpočty s více operacemi najednou, například 5 + 10 \* 8 / 4.

### 2) Řešení s výpočtem na základě více operandů

Toto řešení umožňuje provádět složitější výpočty s více operandy a operacemi.

**Výhody:**

- Flexibilnější a efektivnější pro uživatele.
- Umožňuje složitější výpočty s více operacemi.

**Nevýhody:**

- Je nutné buď ručně napsat parser, což komplikuje práci a zvyšuje množství kódu, ale tento přístup je bezpečnější.
- Alternativně je možné použít `eval` nebo `Function` pro výpočet na základě řetězce. Toto je jednodušší na implementaci, ale přináší významné bezpečnostní rizika, protože `eval` a `Function` vykonávají veškerý kód, který je jim předán, což je velmi nebezpečné.

## Zvolené řešení

V tomto testovacím projektu jsem se rozhodl použít druhou variantu s využitím `Function` pro výpočet na základě řetězce. Toto rozhodnutí bylo učiněno s ohledem na následující:

- **Snadná implementace:**
- **Bezpečnostní rizika:** I když použití `eval` nebo `Function` představuje bezpečnostní rizika, v kontextu tohoto testovacího projektu je hrozba minimální. Je důležité zdůraznit, že v reálných projektech by se tento přístup neměl používat kvůli vážným bezpečnostním rizikům.

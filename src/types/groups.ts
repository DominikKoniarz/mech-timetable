// TODO: remove if unused
export enum LAB_GROUPS {
    L01 = "L01",
    L02 = "L02",
    L03 = "L03",
    L04 = "L04",
    L05 = "L05",
    L06 = "L06",
}

export enum COMPUTER_LAB_GROUPS {
    K01 = "K01",
    K02 = "K02",
    K03 = "K03",
    K04 = "K04",
    K05 = "K05",
}

export enum PROJECT_GROUPS {
    P01 = "P01",
    P02 = "P02",
    P03 = "P03",
    P04 = "P04",
    P05 = "P05",
}

// group by first letter and full groups names
// e.g { A: ["A01", "A02"], B: ["B01", "B02"] }
export type GroupsByFirstLetter = Record<string, string[]>;

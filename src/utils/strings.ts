/********************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

const TWITCH_TIERS: Record<string, string> = { "1000": "T1", "2000": "T2", "3000": "T3" };

export function isBlank(value: string | null | undefined): value is null | undefined {
    return value == null || value.trim() === "";
}

export function fillTemplate(template: string, values: Record<string, unknown>): string {
    return template.replace(/\{(\w+)\}/g, (_, key: string) => {
        const value = values[key];
        if (value != null) {
            return String(value);
        }

        return "";
    });
}

export function formatAmount(value: number, fractionDigits: number): string {
    return value.toLocaleString("en-US", {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits
    });
}

export function normalizeTier(tier: string | null): string | null {
    if (tier == null) {
        return null;
    }

    return TWITCH_TIERS[tier] ?? tier;
}

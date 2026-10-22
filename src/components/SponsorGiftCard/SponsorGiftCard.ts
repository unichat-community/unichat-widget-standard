/********************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import type { UniChatEventSponsorGift } from "@voguh/unichat-api/widgets/events";

import { BaseCard } from "~/components/BaseCard";
import { SPONSOR_GIFT_ENABLED, SPONSOR_GIFT_ICON, SPONSOR_GIFT_MESSAGE } from "~/fields";
import { fillTemplate, normalizeTier } from "~/utils/strings";

import styles from "./styles.module.css";

class SponsorGiftCard extends BaseCard<UniChatEventSponsorGift["data"]> {
    public connectedCallback(): void {
        super.connectedCallback();
        this.classList.add(styles.sponsorGift);
    }

    protected renderPill(): HTMLElement {
        const text = fillTemplate(SPONSOR_GIFT_MESSAGE, { ...this.data, tier: normalizeTier(this.data.tier) });
        return this.createPill(SPONSOR_GIFT_ICON, text);
    }

    protected renderBody(): null {
        return null;
    }
}

customElements.define("uc-sponsor-gift-card", SponsorGiftCard);

export function handleSponsorGiftEvent(data: UniChatEventSponsorGift["data"]): BaseCard | null {
    if (SPONSOR_GIFT_ENABLED) {
        return new SponsorGiftCard(data);
    }

    return null;
}

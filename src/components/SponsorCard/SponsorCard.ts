/********************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import type { UniChatEventSponsor } from "@voguh/unichat-api/widgets/events";

import { BaseCard } from "~/components/BaseCard";
import { SPONSOR_ENABLED, SPONSOR_ICON, SPONSOR_NEW_MESSAGE, SPONSOR_RENEW_MESSAGE } from "~/fields";
import { fillTemplate, isBlank, normalizeTier } from "~/utils/strings";

import styles from "./styles.module.css";

class SponsorCard extends BaseCard<UniChatEventSponsor["data"]> {
    public connectedCallback(): void {
        super.connectedCallback();
        this.classList.add(styles.sponsor);
    }

    protected renderPill(): HTMLElement {
        const values = { ...this.data, tier: normalizeTier(this.data.tier) };
        if (this.data.months > 1) {
            return this.createPill(SPONSOR_ICON, fillTemplate(SPONSOR_RENEW_MESSAGE, values));
        }

        return this.createPill(SPONSOR_ICON, fillTemplate(SPONSOR_NEW_MESSAGE, values));
    }

    protected renderBody(): HTMLElement | null {
        const { messageText, emotes } = this.data;
        if (!isBlank(messageText)) {
            return this.createMessage(messageText, emotes);
        }

        return null;
    }
}

customElements.define("uc-sponsor-card", SponsorCard);

export function handleSponsorEvent(data: UniChatEventSponsor["data"]): BaseCard | null {
    if (SPONSOR_ENABLED) {
        return new SponsorCard(data);
    }

    return null;
}

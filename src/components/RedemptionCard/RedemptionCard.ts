/********************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import type { UniChatEventRedemption } from "@voguh/unichat-api/widgets/events";

import { BaseCard } from "~/components/BaseCard";
import { REDEMPTION_ENABLED, REDEMPTION_ICON, REDEMPTION_MESSAGE } from "~/fields";
import { fillTemplate, isBlank } from "~/utils/strings";

import styles from "./styles.module.css";

class RedemptionCard extends BaseCard<UniChatEventRedemption["data"]> {
    public connectedCallback(): void {
        super.connectedCallback();
        this.classList.add(styles.redemption);
    }

    protected renderPill(): HTMLElement {
        return this.createPill(REDEMPTION_ICON, fillTemplate(REDEMPTION_MESSAGE, this.data));
    }

    protected renderBody(): HTMLElement | null {
        const { messageText, emotes } = this.data;
        if (!isBlank(messageText)) {
            return this.createMessage(messageText, emotes);
        }

        return null;
    }
}

customElements.define("uc-redemption-card", RedemptionCard);

export function handleRedemptionEvent(data: UniChatEventRedemption["data"]): BaseCard | null {
    if (REDEMPTION_ENABLED) {
        return new RedemptionCard(data);
    }

    return null;
}

/********************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import type { UniChatEventDonate } from "@voguh/unichat-api/widgets/events";

import { BaseCard } from "~/components/BaseCard";
import { handleMessageEvent } from "~/components/MessageCard";
import { DONATE_ENABLED, DONATE_ICON, DONATE_MESSAGE, DONATE_MIN_VALUE } from "~/fields";
import { fillTemplate, formatAmount, isBlank } from "~/utils/strings";

import styles from "./styles.module.css";

class DonateCard extends BaseCard<UniChatEventDonate["data"]> {
    public connectedCallback(): void {
        super.connectedCallback();
        this.classList.add(styles.donate);
    }

    protected renderPill(): HTMLElement {
        const text = fillTemplate(DONATE_MESSAGE, { ...this.data, value: formatAmount(this.data.value, 2) });
        return this.createPill(DONATE_ICON, text);
    }

    protected renderBody(): HTMLElement | null {
        const { platform, messageText, emotes, flags } = this.data;
        if (isBlank(messageText)) {
            return null;
        }

        if (platform === "youtube" && "unichat:youtube_super_sticker" in flags) {
            return this.createSticker(this.findEmoteUrl(emotes, messageText)!);
        }

        return this.createMessage(messageText, emotes);
    }
}

customElements.define("uc-donate-card", DonateCard);

export function handleDonateEvent(data: UniChatEventDonate["data"]): BaseCard | null {
    if (DONATE_ENABLED && data.value >= DONATE_MIN_VALUE) {
        return new DonateCard(data);
    } else if (DONATE_ENABLED) {
        return handleMessageEvent(data);
    }

    return null;
}

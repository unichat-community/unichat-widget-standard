/********************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import type { UniChatEventCheer } from "@voguh/unichat-api/widgets/events";

import { BaseCard } from "~/components/BaseCard";
import { handleMessageEvent } from "~/components/MessageCard";
import {
    CHEER_ENABLED,
    CHEER_ICON,
    CHEER_MESSAGE_WITH_VALUE,
    CHEER_MESSAGE_WITHOUT_VALUE,
    CHEER_MIN_VALUE
} from "~/fields";
import { fillTemplate, formatAmount, isBlank } from "~/utils/strings";

import styles from "./styles.module.css";

class CheerCard extends BaseCard<UniChatEventCheer["data"]> {
    public connectedCallback(): void {
        super.connectedCallback();
        this.classList.add(styles.cheer);
    }

    protected renderPill(): HTMLElement {
        const { value } = this.data;
        if (value == null) {
            return this.createPill(CHEER_ICON, fillTemplate(CHEER_MESSAGE_WITHOUT_VALUE, this.data));
        }

        const text = fillTemplate(CHEER_MESSAGE_WITH_VALUE, { ...this.data, value: formatAmount(value, 0) });
        return this.createPill(CHEER_ICON, text);
    }

    protected renderBody(): HTMLElement {
        const { messageText, emotes, cheerIconUrl } = this.data;

        if (!isBlank(messageText)) {
            return this.createMessage(messageText, emotes);
        }

        return this.createSticker(cheerIconUrl!);
    }
}

customElements.define("uc-cheer-card", CheerCard);

export function handleCheerEvent(data: UniChatEventCheer["data"]): BaseCard | null {
    const { value, messageText, cheerIconUrl } = data;
    if (CHEER_ENABLED && value != null && value < CHEER_MIN_VALUE) {
        return handleMessageEvent(data);
    } else if (CHEER_ENABLED && (!isBlank(messageText) || !isBlank(cheerIconUrl))) {
        return new CheerCard(data);
    }

    return null;
}

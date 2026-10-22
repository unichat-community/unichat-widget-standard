/********************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import "~/styles/global.css";

import type { UniChatEvent } from "@voguh/unichat-api/widgets/events";

import type { BaseCard } from "~/components/BaseCard";
import { handleCheerEvent } from "~/components/CheerCard";
import { handleDonateEvent } from "~/components/DonateCard";
import { handleMessageEvent } from "~/components/MessageCard";
import { handleRaidEvent } from "~/components/RaidCard";
import { handleRedemptionEvent } from "~/components/RedemptionCard";
import { ScrollArea } from "~/components/ScrollArea";
import { handleSponsorEvent } from "~/components/SponsorCard";
import { handleSponsorGiftEvent } from "~/components/SponsorGiftCard";
import {
    BROADCASTER_COLOR,
    MAX_MESSAGES,
    MESSAGE_LIFETIME,
    MODERATORS_COLOR,
    SPONSORS_COLOR,
    USE_STATIC_COLOR_FOR_BROADCASTER,
    USE_STATIC_COLOR_FOR_MODERATORS,
    USE_STATIC_COLOR_FOR_SPONSORS,
    USE_STATIC_COLOR_FOR_VIEWERS,
    VIEWERS_COLOR
} from "~/fields";

const MAIN_CONTAINER = document.querySelector<HTMLDivElement>("#main-container")!;
const IS_OBS_DOCK = new URLSearchParams(window.location.search).get("obs_dock") === "true";

function resolveCardsContainer(): HTMLElement {
    if (IS_OBS_DOCK) {
        const scrollArea = new ScrollArea();
        MAIN_CONTAINER.classList.add("obs-dock");
        MAIN_CONTAINER.append(scrollArea);
        return scrollArea.content;
    }

    return MAIN_CONTAINER;
}

const CARDS_CONTAINER = resolveCardsContainer();

/* ========================================================================== */

function resolveAuthorColor(authorType: string): string | null {
    switch (authorType) {
        case "SPONSOR":
            if (USE_STATIC_COLOR_FOR_SPONSORS) {
                return SPONSORS_COLOR;
            }

            break;
        case "MODERATOR":
            if (USE_STATIC_COLOR_FOR_MODERATORS) {
                return MODERATORS_COLOR;
            }

            break;
        case "BROADCASTER":
            if (USE_STATIC_COLOR_FOR_BROADCASTER) {
                return BROADCASTER_COLOR;
            }

            break;
        default:
            if (USE_STATIC_COLOR_FOR_VIEWERS) {
                return VIEWERS_COLOR;
            }

            break;
    }

    return null;
}

function createCard(event: UniChatEvent): BaseCard | null {
    const { data } = event;
    if ("authorType" in data && typeof data.authorType === "string") {
        const authorColor = resolveAuthorColor(data.authorType);
        if (authorColor != null) {
            data.authorDisplayColor = authorColor;
        }
    }

    switch (event.type) {
        case "unichat:message":
            return handleMessageEvent(event.data);
        case "unichat:donate":
            return handleDonateEvent(event.data);
        case "unichat:cheer":
            return handleCheerEvent(event.data);
        case "unichat:sponsor":
            return handleSponsorEvent(event.data);
        case "unichat:sponsor_gift":
            return handleSponsorGiftEvent(event.data);
        case "unichat:raid":
            return handleRaidEvent(event.data);
        case "unichat:redemption":
            return handleRedemptionEvent(event.data);
    }

    return null;
}

function appendCard(card: BaseCard): void {
    CARDS_CONTAINER.append(card);
    if (IS_OBS_DOCK) {
        return;
    }

    if (MESSAGE_LIFETIME > 0) {
        setTimeout(() => card.leave(), MESSAGE_LIFETIME * 1000);
    }

    const activeCards = (Array.from(CARDS_CONTAINER.children) as BaseCard[]).filter((child) => !child.isLeaving);
    const overflow = Math.max(0, activeCards.length - MAX_MESSAGES);
    for (const oldCard of activeCards.slice(0, overflow)) {
        oldCard.leave();
    }
}

function removeCards(attribute: string, value: string): void {
    for (const card of CARDS_CONTAINER.querySelectorAll(`[${attribute}="${value}"]`)) {
        card.remove();
    }
}

/* ========================================================================== */

window.addEventListener("unichat:event", ({ detail: event }) => {
    switch (event.type) {
        case "unichat:clear":
            CARDS_CONTAINER.replaceChildren();
            break;
        case "unichat:remove_message":
            removeCards("data-message-id", event.data.messageId);
            break;
        case "unichat:remove_author":
            removeCards("data-author-id", event.data.authorId);
            break;
        default: {
            const card = createCard(event);
            if (card != null) {
                appendCard(card);
            }
        }
    }
});

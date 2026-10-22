/********************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

// biome-ignore-all lint/complexity/noUselessStringRaw: UniChat substitutes the placeholders without escaping; String.raw keeps `\` typed by the user.
/* <============================[ FIELDS TO JS ]============================> */
export const MAX_MESSAGES = parseInt("{{maxMessages}}", 10);
export const MESSAGE_LIFETIME = parseFloat("{{messageLifetime}}");
export const SHOW_AVATAR: boolean = JSON.parse("{{showAvatar}}");
export const ENTRY_ANIMATION = String("{{entryAnimation}}");
export const EXIT_ANIMATION = String("{{exitAnimation}}");

export const IGNORE_COMMANDS: boolean = JSON.parse("{{ignoreCommands}}");
export const IGNORED_USERS = String.raw`{{ignoredUsers}}`;

export const USE_STATIC_COLOR_FOR_VIEWERS: boolean = JSON.parse("{{useStaticColorForViewers}}");
export const VIEWERS_COLOR = "{{viewersColor}}";
export const USE_STATIC_COLOR_FOR_SPONSORS: boolean = JSON.parse("{{useStaticColorForSponsors}}");
export const SPONSORS_COLOR = "{{sponsorsColor}}";
export const USE_STATIC_COLOR_FOR_MODERATORS: boolean = JSON.parse("{{useStaticColorForModerators}}");
export const MODERATORS_COLOR = "{{moderatorsColor}}";
export const USE_STATIC_COLOR_FOR_BROADCASTER: boolean = JSON.parse("{{useStaticColorForBroadcaster}}");
export const BROADCASTER_COLOR = "{{broadcasterColor}}";

export const STREAK_ENABLED: boolean = JSON.parse("{{streakEnabled}}");
export const STREAK_MIN_DAYS = parseInt("{{streakMinDays}}", 10);
export const STREAK_ICON = "{{streakIcon}}";
export const STREAK_MESSAGE = String.raw`{{streakMessage}}`;

export const DONATE_ENABLED: boolean = JSON.parse("{{donateEnabled}}");
export const DONATE_MIN_VALUE = parseFloat("{{donateMinValue}}");
export const DONATE_ICON = "{{donateIcon}}";
export const DONATE_MESSAGE = String.raw`{{donateMessage}}`;

export const SPONSOR_ENABLED: boolean = JSON.parse("{{sponsorEnabled}}");
export const SPONSOR_ICON = "{{sponsorIcon}}";
export const SPONSOR_NEW_MESSAGE = String.raw`{{sponsorNewMessage}}`;
export const SPONSOR_RENEW_MESSAGE = String.raw`{{sponsorRenewMessage}}`;

export const SPONSOR_GIFT_ENABLED: boolean = JSON.parse("{{sponsorGiftEnabled}}");
export const SPONSOR_GIFT_ICON = "{{sponsorGiftIcon}}";
export const SPONSOR_GIFT_MESSAGE = String.raw`{{sponsorGiftMessage}}`;

export const RAID_ENABLED: boolean = JSON.parse("{{raidEnabled}}");
export const RAID_ICON = "{{raidIcon}}";
export const RAID_MESSAGE_WITH_VIEWERS = String.raw`{{raidMessageWithViewers}}`;
export const RAID_MESSAGE_WITHOUT_VIEWERS = String.raw`{{raidMessageWithoutViewers}}`;

export const CHEER_ENABLED: boolean = JSON.parse("{{cheerEnabled}}");
export const CHEER_MIN_VALUE = parseFloat("{{cheerMinValue}}");
export const CHEER_ICON = "{{cheerIcon}}";
export const CHEER_MESSAGE_WITH_VALUE = String.raw`{{cheerMessageWithValue}}`;
export const CHEER_MESSAGE_WITHOUT_VALUE = String.raw`{{cheerMessageWithoutValue}}`;

export const REDEMPTION_ENABLED: boolean = JSON.parse("{{redemptionEnabled}}");
export const REDEMPTION_ICON = "{{redemptionIcon}}";
export const REDEMPTION_MESSAGE = String.raw`{{redemptionMessage}}`;
/* <==========================[ END FIELDS TO JS ]==========================> */

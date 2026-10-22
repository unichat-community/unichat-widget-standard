/********************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

const path = require("node:path");

const { CopyRspackPlugin } = require("@rspack/core");
const { withUniChatWidgets } = require("@voguh/unichat-widgets-rspack");

/* ================================================================================================================== */

module.exports = withUniChatWidgets({
    context: __dirname,

    module: {
        parser: { "css/auto": { namedExports: false, dashedIdents: false } },
        generator: { "css/auto": { localIdentName: "[hash:base64:6]" } },
        rules: [
            {
                test: /\.m?js/,
                type: "javascript/auto",
                resolve: { fullySpecified: false }
            },
            {
                test: /\.([tj]sx?)$/,
                exclude: /node_modules/,
                type: "javascript/auto",
                use: [
                    {
                        loader: "builtin:swc-loader",
                        options: {
                            jsc: {
                                target: "es2023",
                                parser: { syntax: "typescript" }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                resourceQuery: { not: [/raw/] },
                type: "css/auto"
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                resourceQuery: { not: [/raw/] },
                type: "asset/resource"
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                resourceQuery: { not: [/raw/] },
                type: "asset/resource"
            },
            {
                resourceQuery: /raw/,
                type: "asset/source"
            }
        ]
    },

    resolve: {
        fullySpecified: false,
        extensions: [".ts", ".js"],
        alias: {
            "~": path.resolve(__dirname, "src")
        }
    },

    plugins: [new CopyRspackPlugin({ patterns: [{ from: path.resolve(__dirname, "LICENSE") }] })]
});

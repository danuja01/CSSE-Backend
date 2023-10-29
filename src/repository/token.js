/**
 * Token Repository
 * @author Danuja Jayasuriya
 * @description This module provides functions to add tokens black listed tokens or check wheter a token is black listed or not.
 * @methods blacklistToken(), isBlaackListedToken()
 */

const blacklistedTokens = [];

export const blacklistToken = (token) => {
  blacklistedTokens.push(token);
};

export const isBlacklistedToken = (token) => {
  return blacklistedTokens.includes(token);
};

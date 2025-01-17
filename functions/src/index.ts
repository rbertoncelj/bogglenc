import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as wordService from './word';
import * as gameService from './game';

/**
 * @deprecated kept to support the older version of frontend
 */
export const wordCheck = functions
  .region('europe-west1')
  .https.onRequest((req, res) => {
    cors()(req, res, async () => {
      const wordParam = (req.query.word as string) ?? '';
      const word = wordParam.trim().toLowerCase();

      const checkedWord = await wordService.checkWord(word);

      if (checkedWord) {
        functions.logger.info(`Word is valid: ${word}`);
        res.status(200).send(checkedWord.value);
      } else {
        functions.logger.info(`Word is not valid: ${word}`);
        res.status(400).send('Wrong guess!');
      }
    });
  });

/**
 * Starts a new game.
 * Use GET.
 *
 * @returns {Game}
 */
export const startGame = functions
  .region('europe-west1')
  .https.onRequest((req, res) => {
    cors()(req, res, async () => {
      const game = await gameService.startGame();
      res.status(200).json(game);
    });
  });

/**
 * Verifies a word and updates the game state.
 * Use POST or PUT.
 * Expected request body:
 * <pre>
 * { gameId: string; letterIndexes: number[]; }
 * </pre>
 *
 * @returns {CheckWordResult}
 */
export const guessTheWord = functions
  .region('europe-west1')
  .https.onRequest((req, res) => {
    cors()(req, res, async () => {
      const requestData = req.body as {
        gameId: string;
        letterIndexes: number[];
      };

      const result = await gameService.guessTheWord(
        requestData.gameId,
        requestData.letterIndexes,
      );

      functions.logger.info(`Guessing the word: ${result.word}`, result);

      res.status(200).send(result);
    });
  });

/**
 * Verifies a word and updates the game state.
 * Use POST or PUT.
 * Expected request body:
 * <pre>
 * { gameId: string; name: string }
 * </pre>
 *
 * @returns {Game}
 */
export const submitName = functions
  .region('europe-west1')
  .https.onRequest((req, res) => {
    cors()(req, res, async () => {
      const requestData = req.body as { gameId: string; name: string };

      const game = await gameService.submitName(
        requestData.gameId,
        requestData.name,
      );

      res.status(200).send(game);
    });
  });

/**
 * List up to 50 top games where names were submitted.
 * Use GET
 * @returns {Game[]}
 */
export const getLeaderboard = functions
  .region('europe-west1')
  .https.onRequest((req, res) => {
    cors()(req, res, async () => {
      const leaderboard = await gameService.getLeaderboard();
      res.status(200).send(leaderboard);
    });
  });

/*
  Warnings:

  - You are about to drop the column `voteId` on the `VotingLogDto` table. All the data in the column will be lost.
  - You are about to drop the column `voteParticipatingStarId` on the `VotingLogDto` table. All the data in the column will be lost.
  - You are about to drop the `Vote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VoteParticipatingStar` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `voteCampaignCandidateStarId` to the `VotingLogDto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voteCampaignId` to the `VotingLogDto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `VoteParticipatingStar` DROP FOREIGN KEY `VoteParticipatingStar_starId_fkey`;

-- DropForeignKey
ALTER TABLE `VoteParticipatingStar` DROP FOREIGN KEY `VoteParticipatingStar_voteId_fkey`;

-- DropForeignKey
ALTER TABLE `VotingLog` DROP FOREIGN KEY `VotingLog_voteId_fkey`;

-- DropForeignKey
ALTER TABLE `VotingLog` DROP FOREIGN KEY `VotingLog_voteParticipatingStarId_fkey`;

-- DropIndex
DROP INDEX `VotingLog_voteId_fkey` ON `VotingLogDto`;

-- DropIndex
DROP INDEX `VotingLog_voteParticipatingStarId_fkey` ON `VotingLogDto`;

-- AlterTable
ALTER TABLE `VotingLog` DROP COLUMN `voteId`,
    DROP COLUMN `voteParticipatingStarId`,
    ADD COLUMN `voteCampaignCandidateStarId` BIGINT NOT NULL,
    ADD COLUMN `voteCampaignId` BIGINT NOT NULL;

-- DropTable
DROP TABLE `Vote`;

-- DropTable
DROP TABLE `VoteParticipatingStar`;

-- CreateTable
CREATE TABLE `VoteCampaign` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `startTime` TIMESTAMP(3) NOT NULL,
    `endTime` TIMESTAMP(3) NOT NULL,
    `createdAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` TIMESTAMP(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VoteCampaignCandidateStar` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `voteCampaignId` BIGINT NOT NULL,
    `starId` BIGINT NOT NULL,
    `quantity` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `createdAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` TIMESTAMP(3) NULL,

    UNIQUE INDEX `VoteCampaignCandidateStar_voteCampaignId_starId_key`(`voteCampaignId`, `starId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VoteCampaignCandidateStar` ADD CONSTRAINT `VoteCampaignCandidateStar_voteCampaignId_fkey` FOREIGN KEY (`voteCampaignId`) REFERENCES `VoteCampaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VoteCampaignCandidateStar` ADD CONSTRAINT `VoteCampaignCandidateStar_starId_fkey` FOREIGN KEY (`starId`) REFERENCES `Star`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VotingLog` ADD CONSTRAINT `VotingLog_voteCampaignId_fkey` FOREIGN KEY (`voteCampaignId`) REFERENCES `VoteCampaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VotingLog` ADD CONSTRAINT `VotingLog_voteCampaignCandidateStarId_fkey` FOREIGN KEY (`voteCampaignCandidateStarId`) REFERENCES `VoteCampaignCandidateStar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

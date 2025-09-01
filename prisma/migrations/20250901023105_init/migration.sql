-- CreateTable
CREATE TABLE `User` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(30) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` TIMESTAMP(3) NULL,

    UNIQUE INDEX `User_nickname_key`(`nickname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

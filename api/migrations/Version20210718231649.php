<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210718231649 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C84955F6B75B26');
        $this->addSql('DROP INDEX UNIQ_42C84955F6B75B26 ON reservation');
        $this->addSql('ALTER TABLE reservation CHANGE machine_id machine_reserved_id INT NOT NULL');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955D09D59D6 FOREIGN KEY (machine_reserved_id) REFERENCES machine (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_42C84955D09D59D6 ON reservation (machine_reserved_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reservation DROP FOREIGN KEY FK_42C84955D09D59D6');
        $this->addSql('DROP INDEX UNIQ_42C84955D09D59D6 ON reservation');
        $this->addSql('ALTER TABLE reservation CHANGE machine_reserved_id machine_id INT NOT NULL');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955F6B75B26 FOREIGN KEY (machine_id) REFERENCES machine (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_42C84955F6B75B26 ON reservation (machine_id)');
    }
}

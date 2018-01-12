<?php
/**
 * @category    CleverSoft
 * @package     CleverBase
 * @copyright   Copyright © 2017 CleverSoft., JSC. All Rights Reserved.
 * @author 		ZooExtension.com
 * @email       magento.cleversoft@gmail.com
 */
 
 namespace CleverSoft\Base\Setup;

use Magento\Eav\Setup\EavSetupFactory;
use Magento\Framework\Setup\UpgradeDataInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;

/**
 * Upgrade Data script
 * @codeCoverageIgnore
 */
class UpgradeData implements UpgradeDataInterface
{
    /**
     * Category setup factory
     *
     * @var CategorySetupFactory
     */
    private $eavSetupFactory ;

    /**
     * Init
     *
     * @param CategorySetupFactory $eavSetupFactory
     */
    public function __construct(EavSetupFactory  $eavSetupFactory)
    {
        $this->eavSetupFactory  = $eavSetupFactory;
    }

    /**
     * {@inheritdoc}
     * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
     */
    public function upgrade(ModuleDataSetupInterface $setup, ModuleContextInterface $context)
    {
        $setup->startSetup();
          // set new resource model paths
            /** @var \Magento\Catalog\Setup\CategorySetup $eavSetup */
            $eavSetup  = $this->eavSetupFactory->create(['setup' => $setup]);

        $setup->endSetup();
    }
}

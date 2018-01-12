<?php
/**
 * @category    CleverSoft
 * @package     Clever Product Composer
 * @copyright   Copyright © 2017 CleverSoft., JSC. All Rights Reserved.
 * @author 		ZooExtension.com
 * @email       magento.cleversoft@gmail.com
 */

namespace CleverSoft\CleverProduct\Model\Widget\Source\Parallax\Video;

class Layout implements \Magento\Framework\Option\ArrayInterface{
    public function toOptionArray(){
        $types[] = array('value' => 'custom', 'label' => __('Custom'));
        $types[] = array('value' => 'fullwidth', 'label' => __('Full Width'));
        $types[] = array('value' => 'fullscreen', 'label' => __('Full Screen'));

        return $types;
    }
}

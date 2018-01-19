<?php
/**
 * @category    CleverSoft
 * @package     CleverDeferJs
 * @copyright   Copyright © 2017 CleverSoft., JSC. All Rights Reserved.
 * @author 		ZooExtension.com
 * @email       magento.cleversoft@gmail.com
 */
namespace CleverSoft\CleverDeferJs\Observer\Controller;

class DeferJs implements \Magento\Framework\Event\ObserverInterface
{
    protected $helper;

    public function __construct(\CleverSoft\CleverDeferJs\Helper\Data $data){
        $this->helper = $data;
    }

	public function execute(
		\Magento\Framework\Event\Observer $observer
	) {
        if($this->helper->getConfig('cleverdeferjs/general/enable')) {
            $response = $observer->getEvent()->getResponse();
            if (!$response) return;

            $html = $response->getBody();
            if (stripos($html, "</body>") === false) return;

            preg_match_all('~<\s*\bscript\b[^>]*>(.*?)<\s*\/\s*script\s*>~is', $html, $scripts);
            if ($scripts and isset($scripts[0]) and $scripts[0]) {
                $html = preg_replace('~<\s*\bscript\b[^>]*>(.*?)<\s*\/\s*script\s*>~is', '', $response->getBody());
                $scripts = implode("", $scripts[0]);
                $html = str_ireplace("</body>", "$scripts</body>", $html);
                $response->setBody($html);
            }
        }
	}
}

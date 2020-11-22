auto();
console.show();

importClass('java.net.Inet4Address');
importClass('java.net.InetAddress');
importClass('java.net.NetworkInterface');
importClass('java.util.Enumeration');
importClass('java.net.Inet6Address');
//获取内网IP地址
device.wakeUp();
while(true) {
    sleep(3000)
    device.setBrightnessMode(0)
    device.setBrightness(0)
    var hostIp = null;
    try{
        var nis = NetworkInterface.getNetworkInterfaces();
        var ia = null;
        while (nis.hasMoreElements()) {
            var ni = nis.nextElement();
            var ias = ni.getInetAddresses();
            while (ias.hasMoreElements()) {  
                ia = ias.nextElement();  
                if (ia instanceof Inet6Address) {
                    continue;
                }
                var ip = ia.getHostAddress();
                if (!"127.0.0.1".equals(ip)) {
                    hostIp = ia.getHostAddress();
                    log(hostIp);
                    break;
                }
            }
        }
    } catch (e) {
        log(e);
    }
    if (hostIp==null) {
        // 没有获取到地址尝试打开飞行模式
        quickSettings();  // 下拉窗口
        sleep(3000);
        click(150,400); // 点击飞行模式按钮
        sleep(3000);
    }
}
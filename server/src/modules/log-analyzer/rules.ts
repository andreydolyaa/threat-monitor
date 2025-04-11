export type LogRule = {
  pattern: RegExp;
  severity: number;
  suspicious: boolean;
  summary: string | ((line: string, match: RegExpMatchArray) => string);
};

export const rules: LogRule[] = [
  // auth.log
  {
    pattern: /Failed password for (invalid user )?(\w+) from ([\d.]+)/,
    severity: 7,
    summary: (_, match) => `Failed login for user '${match[2]}' from IP ${match[3]}`,
    suspicious: true
  },
  {
    pattern: /Accepted password for (\w+) from ([\d.]+)/,
    severity: 4,
    summary: (_, match) => `Successful login for user '${match[1]}' from IP ${match[2]}`,
    suspicious: false
  },
  {
    pattern: /Invalid user (\w+) from ([\d.]+)/,
    severity: 8,
    summary: (_, match) => `Login attempt with invalid user '${match[1]}' from ${match[2]}`,
    suspicious: true
  },
  {
    pattern: /authentication failure;/,
    severity: 6,
    summary: 'Authentication failure (PAM)',
    suspicious: true
  },
  {
    pattern: /maximum authentication attempts exceeded/,
    severity: 8,
    summary: 'Brute-force login suspected (max attempts exceeded)',
    suspicious: true
  },
  {
    pattern: /User not known to the underlying authentication module/,
    severity: 7,
    summary: 'Login with unknown user (auth module)',
    suspicious: true
  },
  {
    pattern: /sudo: .* : TTY=.* ; PWD=.* ; USER=.* ; COMMAND=(.*)/,
    severity: 6,
    summary: (_, match) => `Command run with sudo: ${match[1]}`,
    suspicious: true
  },
  {
    pattern: /session opened for user root/,
    severity: 9,
    summary: 'Root session started',
    suspicious: true
  },
  {
    pattern: /session closed for user root/,
    severity: 5,
    summary: 'Root session ended',
    suspicious: false
  },
  {
    pattern: /useradd\[.*\]: new user: (\w+)/,
    severity: 6,
    summary: (_, match) => `New user added: ${match[1]}`,
    suspicious: true
  },
  {
    pattern: /usermod\[.*\]: change user/,
    severity: 6,
    summary: 'User account modified',
    suspicious: true
  },
  {
    pattern: /groupadd\[.*\]: new group:/,
    severity: 4,
    summary: 'New group added',
    suspicious: false
  },
  // syslog
  {
    pattern: /kernel: \[.*\] .*segfault/,
    severity: 9,
    summary: 'Segmentation fault in kernel log',
    suspicious: true
  },
  {
    pattern: /CRON.*CMD/,
    severity: 2,
    summary: 'Cron job executed',
    suspicious: false
  },
  {
    pattern: /systemd\[.*\]: Starting ([^;]+)/,
    severity: 2,
    summary: (_, match) => `Service starting: ${match[1]}`,
    suspicious: false
  },
  {
    pattern: /systemd\[.*\]: Stopped ([^;]+)/,
    severity: 2,
    summary: (_, match) => `Service stopped: ${match[1]}`,
    suspicious: false
  },
  {
    pattern: /oom-killer:/,
    severity: 9,
    summary: 'Out of memory killer activated',
    suspicious: true
  },
  {
    pattern: /usb \d+-\d+: USB disconnect/,
    severity: 3,
    summary: 'USB device disconnected',
    suspicious: false
  },
  {
    pattern: /usb \d+-\d+: new high-speed USB device/,
    severity: 3,
    summary: 'New USB device connected',
    suspicious: true
  },
  {
    pattern: /firewalld.*added rule/,
    severity: 5,
    summary: 'Firewall rule added (firewalld)',
    suspicious: true
  },
  {
    pattern: /firewalld.*removed rule/,
    severity: 5,
    summary: 'Firewall rule removed (firewalld)',
    suspicious: true
  },
  {
    pattern: /NetworkManager.*dhcp4.*bound to ([\d.]+)/,
    severity: 2,
    summary: (_, match) => `DHCP assigned IP: ${match[1]}`,
    suspicious: false
  },
  {
    pattern: /modprobe: module (.+) not found/,
    severity: 4,
    summary: (_, match) => `Kernel module not found: ${match[1]}`,
    suspicious: true
  },
  {
    pattern: /journal: Suppressed \d+ messages/,
    severity: 3,
    summary: 'Systemd journal dropped messages',
    suspicious: true
  },
  {
    pattern: /ufw block/,
    severity: 6,
    summary: 'UFW blocked traffic',
    suspicious: true
  },
  {
    pattern: /rsyslogd:.*action 'action.*' resumed/,
    severity: 3,
    summary: 'rsyslog resumed a failed action',
    suspicious: true
  },
  {
    pattern: /smartd.*SMART Prefailure Attribute/,
    severity: 9,
    summary: 'Disk SMART warning — potential failure',
    suspicious: true
  }
];

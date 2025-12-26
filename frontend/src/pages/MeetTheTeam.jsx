import { FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const MeetTheTeam = () => {
    const teamMembers = [
        {
            name: 'Amulya Koimattur',
            phone: '7975026040',
            email: 'amulyakoimattur@gmail.com',
            linkedin: 'https://www.linkedin.com/in/amulya-koimattur',

        },
        {
            name: 'Vaishnavi Gavi',
            phone: '8792372853',
            email: 'vaishnavigavi05@gmail.com',
            linkedin: '#',

        },
        {
            name: 'Meghana Kulkarni',
            phone: '9019808178',
            email: 'meghakulkarni1702@gmail.com',
            linkedin: '#',


        }
    ];

    return (
        <div className='px-6 lg:px-12 py-20'>
            <h1 className='text-center text-3xl py-10 font-semibold text-secondary sm:text-6xl sm:leading-relaxed'>
                Meet Our Team
            </h1>

            <div className="max-w-6xl mx-auto">
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Our passionate team is dedicated to bringing you the best recipe sharing experience.
                    Get to know the people behind Veggify!
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                        >
                            <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-32"></div>
                            <div className="p-6 -mt-16">
                                <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg border-4 border-white">
                                    <span className="text-4xl font-bold text-btnColor">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-center text-secondary mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-center text-gray-500 mb-6">{member.role}</p>

                                <div className="space-y-3">
                                    <a
                                        href={`tel:${member.phone}`}
                                        className="flex items-center gap-3 text-gray-700 hover:text-btnColor transition-colors group"
                                    >
                                        <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                                            <FaPhone className="text-btnColor" />
                                        </div>
                                        <span className="text-sm">{member.phone}</span>
                                    </a>

                                    <a
                                        href={`mailto:${member.email}`}
                                        className="flex items-center gap-3 text-gray-700 hover:text-btnColor transition-colors group"
                                    >
                                        <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                                            <FaEnvelope className="text-btnColor" />
                                        </div>
                                        <span className="text-sm break-all">{member.email}</span>
                                    </a>

                                    {member.linkedin !== '#' && (
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors group"
                                        >
                                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                                <FaLinkedin className="text-blue-600" />
                                            </div>
                                            <span className="text-sm">LinkedIn Profile</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MeetTheTeam;
